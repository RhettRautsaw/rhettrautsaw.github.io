---
hide:
  - navigation
  - toc
---

# HelixText

A fun app to convert amino acid sequence (text) into DNA sequence. 

<div class="helixtext-app">
  <div class="app-form-group">
    <label for="text-input">Amino Acid Sequence (Text):</label>
    <textarea id="text-input" class="app-input-box" placeholder="Enter amino acid sequence here..."></textarea>
  </div>

  <div class="app-arrow-buttons">
    <button type="button" onclick="convertToDNA()">&#8595; Convert to DNA &#8595;</button>
    <button type="button" onclick="convertToText()">&#8593; Convert to Amino Acids &#8593;</button>
  </div>

  <div class="app-form-group">
    <label for="dna-input">DNA Sequence:</label>
    <textarea id="dna-input" class="app-input-box" placeholder="Enter DNA sequence here..."></textarea>
  </div>

  <h2>Codon to Amino Acid Translation Table</h2>
  <table id="translation-table">
    <thead>
      <tr>
        <th>Amino Acid (1-letter)</th>
        <th>Amino Acid (3-letter)</th>
        <th>Amino Acid (Full Name)</th>
        <th>Codons</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</div>

<script>
  const reverseTranslationTable = {
    'A': { codons: ['GCT', 'GCC', 'GCA', 'GCG'], fullName: 'Alanine', threeLetter: 'Ala' },
    'C': { codons: ['TGT', 'TGC'], fullName: 'Cysteine', threeLetter: 'Cys' },
    'D': { codons: ['GAT', 'GAC'], fullName: 'Aspartic Acid', threeLetter: 'Asp' },
    'E': { codons: ['GAA', 'GAG'], fullName: 'Glutamic Acid', threeLetter: 'Glu' },
    'F': { codons: ['TTT', 'TTC'], fullName: 'Phenylalanine', threeLetter: 'Phe' },
    'G': { codons: ['GGT', 'GGC', 'GGA', 'GGG'], fullName: 'Glycine', threeLetter: 'Gly' },
    'H': { codons: ['CAT', 'CAC'], fullName: 'Histidine', threeLetter: 'His' },
    'I': { codons: ['ATT', 'ATC', 'ATA'], fullName: 'Isoleucine', threeLetter: 'Ile' },
    'K': { codons: ['AAA', 'AAG'], fullName: 'Lysine', threeLetter: 'Lys' },
    'L': { codons: ['CTT', 'CTC', 'CTA', 'CTG', 'TTA', 'TTG'], fullName: 'Leucine', threeLetter: 'Leu' },
    'M': { codons: ['ATG'], fullName: 'Methionine', threeLetter: 'Met' },
    'N': { codons: ['AAT', 'AAC'], fullName: 'Asparagine', threeLetter: 'Asn' },
    'P': { codons: ['CCT', 'CCC', 'CCA', 'CCG'], fullName: 'Proline', threeLetter: 'Pro' },
    'Q': { codons: ['CAA', 'CAG'], fullName: 'Glutamine', threeLetter: 'Gln' },
    'R': { codons: ['CGT', 'CGC', 'CGA', 'CGG', 'AGA', 'AGG'], fullName: 'Arginine', threeLetter: 'Arg' },
    'S': { codons: ['TCT', 'TCC', 'TCA', 'TCG', 'AGT', 'AGC'], fullName: 'Serine', threeLetter: 'Ser' },
    'T': { codons: ['ACT', 'ACC', 'ACA', 'ACG'], fullName: 'Threonine', threeLetter: 'Thr' },
    'V': { codons: ['GTT', 'GTC', 'GTA', 'GTG'], fullName: 'Valine', threeLetter: 'Val' },
    'W': { codons: ['TGG'], fullName: 'Tryptophan', threeLetter: 'Trp' },
    'Y': { codons: ['TAT', 'TAC'], fullName: 'Tyrosine', threeLetter: 'Tyr' },
    'B': { codons: ['RAT', 'RAC'], fullName: 'Aspartic Acid / Asparagine', threeLetter: 'Asx' },
    'J': { codons: ['MTA', 'MTC', 'MTT'], fullName: 'Leucine / Isoleucine', threeLetter: 'Xle' },
    'O': { codons: ['TAA'], fullName: 'Pyrrolysine', threeLetter: 'Pyl' },
    'U': { codons: ['TGA'], fullName: 'Selenocysteine', threeLetter: 'Sec' },
    'X': { codons: ['NNN'], fullName: 'Any Amino Acid', threeLetter: 'Xaa' },
    'Z': { codons: ['SAA', 'SAG'], fullName: 'Glutamine / Glutamic Acid', threeLetter: 'Glx' }
  };

  const inverseTranslationTable = Object.entries(reverseTranslationTable)
    .flatMap(([aminoAcid, data]) => data.codons.map(codon => [codon, aminoAcid]));

  const codonToAminoAcid = Object.fromEntries(inverseTranslationTable);

  function convertToDNA() {
    const text = document.getElementById('text-input').value.toUpperCase();
    let dnaSequence = '';

    for (let char of text) {
      if (reverseTranslationTable[char]) {
        const codons = reverseTranslationTable[char].codons;
        const randomCodon = codons[Math.floor(Math.random() * codons.length)];
        dnaSequence += randomCodon;
      } else {
        alert(`Unsupported character '${char}'`);
        return;
      }
    }

    document.getElementById('dna-input').value = dnaSequence;
  }

  function convertToText() {
    const dnaSequence = document.getElementById('dna-input').value.toUpperCase();
    let text = '';

    for (let i = 0; i < dnaSequence.length; i += 3) {
      const codon = dnaSequence.slice(i, i + 3);
      const aminoAcid = codonToAminoAcid[codon];
      if (aminoAcid) {
        text += aminoAcid;
      } else {
        alert(`Unsupported codon '${codon}'`);
        return;
      }
    }

    document.getElementById('text-input').value = text;
  }

  function populateTranslationTable() {
    const tableBody = document.getElementById('translation-table')?.querySelector('tbody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    Object.entries(reverseTranslationTable).forEach(([aminoAcid, data]) => {
      const row = document.createElement('tr');
      const aminoAcidCell = document.createElement('td');
      aminoAcidCell.textContent = aminoAcid;
      const threeLetterCell = document.createElement('td');
      threeLetterCell.textContent = data.threeLetter;
      const fullNameCell = document.createElement('td');
      fullNameCell.textContent = data.fullName;
      const codonCell = document.createElement('td');
      codonCell.textContent = data.codons.join(', ');

      row.appendChild(aminoAcidCell);
      row.appendChild(threeLetterCell);
      row.appendChild(fullNameCell);
      row.appendChild(codonCell);
      tableBody.appendChild(row);
    });
  }

  document.addEventListener('DOMContentLoaded', populateTranslationTable);
</script>
