---
hide:
  - navigation
  - toc
---

# BaseModViewer

<div class="basemodviewer-app">
  <p>
    Modified bases are annotated using the <strong>MM</strong> (Modification Map) and <strong>ML</strong> (Modification Likelihood) tags within BAM files.<br><br>
    The <strong>MM</strong> tag describes which bases in the sequence are modified and provides the type of modification. It follows a pattern like <code>MM:Z:<strong>C+m,5,12,0;</strong></code>, where the first base (e.g., 'C') indicates the base type, the sign ('+') indicates the strand, and the subsequent numbers indicate the positions of the modified bases.<br><br>
    The <strong>ML</strong> tag provides the modification probability, which is encoded as an array of values ranging from 0 to 255 - a 100% likelihood would be 255/255 and a 0% likelihood would be 0/255.<br><br>
    PacBio sequencing technologies use the kinetics of DNA polymerase during sequencing (specifically the duration of base incorporation and pauses between base incorporation) to detect and call these modifications. Methylated bases act as a molecular speed bump slowing down the polymerase and base incorporation. After data processing with bioinformatic software, this information is then stored as <strong>MM/ML</strong> tags in the BAM files.<br><br>
    Enter a line from your own data or click the example to see how these tags work. Can you find the CG methylation island and the Fiber-Seq 6mA open chromatin region in the example provided?
  </p>

  <div class="app-form-group">
    <label for="inputArea"><strong>Enter a single line from a BAM file:</strong></label>
    <textarea id="inputArea" class="basemod-input" placeholder="Paste BAM file line here..."></textarea>
  </div>

  <div class="basemod-actions">
    <button type="button" class="basemod-button basemod-button-primary" onclick="processInput()">Highlight Modified Bases</button>
    <button type="button" class="basemod-button basemod-button-secondary" onclick="insertExample()">Insert Example BAM Line</button>
  </div>

  <div id="error" class="basemod-error"></div>
  <div id="highlightedSeqContainer"></div>
</div>

<script>
  function processInput() {
    const input = document.getElementById('inputArea').value;
    const errorDiv = document.getElementById('error');
    const outputContainer = document.getElementById('highlightedSeqContainer');
    errorDiv.textContent = '';
    outputContainer.innerHTML = '';

    try {
      const { seq, mmSubtags } = extractSeqAndMM(input);

      mmSubtags.forEach(subtag => {
        subtag.positions = getModifiedPositions(seq, subtag);
        subtag.currentCount = 0;
        subtag.positionIndex = 0;
        subtag.done = false;
      });

      outputContainer.innerHTML = generateHighlightedSequence(seq, mmSubtags);
    } catch (e) {
      errorDiv.textContent = e.message;
      console.error(e);
    }
  }

  function insertExample() {
    const exampleBamLine = [
      'r004',
      '0',
      'ref',
      '1',
      '60',
      '200M',
      '*',
      '0',
      '0',
      'ACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGT',
      '*',
      'MM:Z:C+m,3,6,12,0,0,0,0,0,6,8,3,2;A+a,4,2,3,2,0,0,0,0,0,1,10,6,6,3,0;G-m,3,6,12,0,0,0,0,0,6,8,3,2;T-a,4,2,3,2,0,0,0,0,0,1,10,6,6,3,0;'
    ].join('\t');
    document.getElementById('inputArea').value = exampleBamLine;
  }

  function extractSeqAndMM(bamLine) {
    const fields = bamLine.trim().split('\t');
    if (fields.length < 11) {
      throw new Error('Invalid BAM file line. It must contain at least 11 fields.');
    }

    const seq = fields[9];
    const optionalFields = fields.slice(11);
    const mmSubtags = [];

    for (const field of optionalFields) {
      if (field.startsWith('MM:Z:')) {
        const mmTags = field.replace('MM:Z:', '').split(';').filter(tag => tag);
        mmTags.forEach(tag => {
          const match = tag.match(/^([ACGTUN])([+-])([a-z]+)([.?]?),(.*)$/);
          if (match) {
            const [_, baseType, strand, modCodes, flag, deltas] = match;
            const deltaList = deltas.split(',').map(Number);
            mmSubtags.push({
              baseType,
              strand,
              modCodes,
              flag,
              deltaList,
              modTag: `${baseType}${strand}${modCodes}`,
            });
          }
        });
        break;
      }
    }

    if (mmSubtags.length === 0) {
      throw new Error('MM tag not found or invalid in the BAM file line.');
    }

    return { seq, mmSubtags };
  }

  function generateHighlightedSequence(seq, mmSubtags) {
    const lineLength = 80;
    const seqLength = seq.length;
    const lines = [];
    const seqArray = seq.split('');
    const revCompSeqArray = seqArray.map(base => complementBase(base)).reverse();

    for (let i = 0; i < seqLength; i += lineLength) {
      const lineSeq = seqArray.slice(i, Math.min(i + lineLength, seqLength));
      const revCompLineSeq = revCompSeqArray.slice(seqLength - i - lineSeq.length, seqLength - i).reverse();
      lines.push(generateSequenceLine(lineSeq, revCompLineSeq, i, mmSubtags, seqLength));
    }

    return lines.join('\n');
  }

  function generateSequenceLine(lineSeq, revCompLineSeq, offset, mmSubtags, seqLength) {
    let result = '';
    const lineLength = lineSeq.length;

    mmSubtags.filter(subtag => subtag.strand === '+').forEach(subtag => {
      const counts = generateCountsLine(lineSeq, offset, subtag, lineLength, seqLength, '+');
      result += '<div class="base-count">';
      counts.forEach(count => {
        result += `<span class="count-cell">${count}</span>`;
      });
      result += `<span class="label-right">(${subtag.modTag})</span>`;
      result += '</div>';
    });

    result += '<div class="sequence-line">';
    lineSeq.forEach((base, idx) => {
      const globalIndex = offset + idx;
      const modified = mmSubtags.some(subtag => subtag.positions.includes(globalIndex) && subtag.strand === '+');
      const subtag = mmSubtags.find(subtag => subtag.positions.includes(globalIndex) && subtag.strand === '+');
      if (modified) {
        const className = getHighlightClass(subtag);
        result += `<span class="count-cell"><span class="${className}">${base}</span></span>`;
      } else {
        result += `<span class="count-cell">${base}</span>`;
      }
    });
    result += '</div>';

    result += '<div class="sequence-line">';
    revCompLineSeq.forEach((base, idx) => {
      const globalIndex = seqLength - 1 - (offset + idx);
      const modified = mmSubtags.some(subtag => subtag.positions.includes(globalIndex) && subtag.strand === '-');
      const subtag = mmSubtags.find(subtag => subtag.positions.includes(globalIndex) && subtag.strand === '-');
      if (modified) {
        const className = getHighlightClass(subtag);
        result += `<span class="count-cell"><span class="${className}">${base}</span></span>`;
      } else {
        result += `<span class="count-cell">${base}</span>`;
      }
    });
    result += '</div>';

    mmSubtags.filter(subtag => subtag.strand === '-').forEach(subtag => {
      const counts = generateCountsLine(lineSeq, offset, subtag, lineLength, seqLength, '-');
      result += '<div class="base-count">';
      counts.forEach(count => {
        result += `<span class="count-cell">${count}</span>`;
      });
      result += `<span class="label-right">(${subtag.modTag})</span>`;
      result += '</div>';
    });

    result += '<div class="basemod-line-spacer"></div>';
    return result;
  }

  function generateCountsLine(seqArray, offset, subtag, lineLength, seqLength, strand) {
    let counts = [];
    let positions = subtag.positions;
    let basePositions = getBasePositionsInLine(seqArray, offset, subtag, seqLength, strand);
    let count = subtag.currentCount || 0;
    let positionIndex = subtag.positionIndex || 0;

    if (subtag.done) {
      for (let idx = 0; idx < lineLength; idx++) {
        counts.push(' ');
      }
      return counts;
    }

    for (let idx = 0; idx < lineLength; idx++) {
      const basePos = basePositions.find(pos => pos.idx === idx);
      if (basePos) {
        const globalIndex = basePos.globalIndex;
        if (positions.includes(globalIndex)) {
          counts.push('*');
          count = 0;
          positionIndex++;
          if (positionIndex >= positions.length) {
            subtag.done = true;
            subtag.currentCount = count;
            subtag.positionIndex = positionIndex;
            for (let j = idx + 1; j < lineLength; j++) {
              counts.push(' ');
            }
            break;
          }
        } else {
          count += 1;
          counts.push(count);
        }
      } else {
        counts.push(' ');
      }
    }

    subtag.currentCount = count;
    subtag.positionIndex = positionIndex;
    return counts;
  }

  function getBasePositionsInLine(seqArray, offset, subtag, seqLength, strand) {
    const basePositions = [];
    const baseType = subtag.baseType;
    seqArray.forEach((base, idx) => {
      const baseUpper = base.toUpperCase();
      if (baseUpper === baseType) {
        let globalIndex;
        if (strand === '+') {
          globalIndex = offset + idx;
        } else {
          globalIndex = seqLength - 1 - (offset + idx);
        }
        basePositions.push({ idx, globalIndex });
      }
    });
    return basePositions;
  }

  function getModifiedPositions(seq, subtag) {
    const positions = [];
    const baseType = subtag.baseType;
    const deltaList = subtag.deltaList.slice();
    const strand = subtag.strand;
    const seqArray = seq.split('');
    const seqLength = seqArray.length;
    const basePositions = [];

    if (strand === '+') {
      for (let i = 0; i < seqLength; i++) {
        if (seqArray[i].toUpperCase() === baseType) {
          basePositions.push(i);
        }
      }
    } else {
      for (let i = seqLength - 1; i >= 0; i--) {
        if (complementBase(seqArray[i]).toUpperCase() === baseType) {
          basePositions.push(i);
        }
      }
    }

    let baseIndex = 0;
    for (let delta of deltaList) {
      baseIndex += delta;
      if (baseIndex >= basePositions.length) break;
      positions.push(basePositions[baseIndex]);
      baseIndex += 1;
    }

    return positions;
  }

  function getHighlightClass(subtag) {
    const baseType = subtag.baseType;
    const strand = subtag.strand;

    if ((baseType === 'C' && strand === '+') || (baseType === 'G' && strand === '-')) {
      return 'highlight-c';
    } else if ((baseType === 'A' && strand === '+') || (baseType === 'T' && strand === '-')) {
      return 'highlight-a';
    } else if ((baseType === 'G' && strand === '+') || (baseType === 'C' && strand === '-')) {
      return 'highlight-g';
    } else if ((baseType === 'T' && strand === '+') || (baseType === 'A' && strand === '-')) {
      return 'highlight-t';
    } else {
      return 'highlight-other';
    }
  }

  function complementBase(base) {
    const complements = { A: 'T', T: 'A', G: 'C', C: 'G', N: 'N' };
    return complements[base.toUpperCase()] || 'N';
  }
</script>
