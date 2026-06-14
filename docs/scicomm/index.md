<br>

# Scientific Communication

Research is only as impactful as the people it reaches. Scientists must be able to communicate science effectively to a broad range of audiences.

I enjoy translating science across audiences, from undergraduate classrooms and technical workshops to public snake education events, community presentations, and conference talks. Below is a summary of the teaching, presentations, and outreach activities.

## Featured Media & Recognition

![BioOne Ambassador Award logo](images/BioOneAmbassadorLogo.png){ width="220" align=right }

**BioOne Ambassador Award:** In 2019, I was selected as a BioOne Ambassador, an award recognizing early-career authors who communicate the importance and impact of their research to the public – due to a video created to highlight a portion of my M.S. research on *The Impact of Railways on Gopher Tortoises*

- [BioOne Ambassador Award winners](images/media_coverage/2019-05-06_BioOne-Ambassadors.pdf)
- [BioOne Meet the Winners](images/media_coverage/2019-05-06_BioOne-MeetRautsaw.pdf)
- [BioOne Ambassador Award: catching up (2020)](images/media_coverage/2019-05-06_BioOne-MeetRautsaw.pdf)
- [Clemson News](images/media_coverage/2019-05-06_Clemson-News_BioOne.pdf) | [UCF CoS News](images/media_coverage/2019-07-17_UCF-COSNEWS_BioOne.pdf) | [Early Bird](images/media_coverage/2019-05_EarlyBird-BioOne.pdf)

**Sigma Xi Student Research Showcase:** 

- [Sigma Xi 2018 Student Research Showcase](images/media_coverage/2018_SigmaXi_Showcase.pdf)

<div class="outreach-video">
  <iframe src="https://www.youtube.com/embed/JhTt839eNJQ" title="The Impact of Railways on Gopher Tortoises" frameborder="0" allowfullscreen></iframe>
</div>

## Media Coverage

{% set media_coverage = pd_read_json('data/media_coverage.json').to_dict('records') %}

| Year | Coverage | Outlet / Topic |
|---|---|---|
{% for item in media_coverage -%}
{% if loop.first or item.topic != media_coverage[loop.index0 - 1].topic -%}
| --- | <h1> {{ item.topic }} </h1> | --- |
{% endif -%}
| {{ item.year }} | [{{ item.coverage }}]({{ item.link }}){% if item.video_link %}<br>[{{ item.video_label }}]({{ item.video_link }}){% endif %} | {{ item.outlet }} |
{% endfor %}

## Invited Presentations

{% set invited_presentations = pd_read_json('data/invited_presentations.json').to_dict('records') %}

| No. | Year | Citation |
|:---:|:---:|----------|
{% for item in invited_presentations -%}
| {{ item.number }} | {{ item.year }} | {{ item.citation }} |
{% endfor %}

## Oral Presentations

{% set oral_presentations = pd_read_json('data/oral_presentations.json').to_dict('records') %}

| No. | Year | Citation | Award |
|:---:|:---:|----------|-------|
{% for item in oral_presentations -%}
| {{ item.number }} | {{ item.year }} | {{ item.citation }} | {{ item.award }} |
{% endfor %}

## Poster Presentations

{% set poster_presentations = pd_read_json('data/poster_presentations.json').to_dict('records') %}

| No. | Year | Citation | Award |
|:---:|:---:|----------|-------|
{% for item in poster_presentations -%}
| {{ item.number }} | {{ item.year }} | {{ item.citation }} | {{ item.award }} |
{% endfor %}

## Public Outreach

{% set public_outreach = pd_read_json('data/public_outreach.json').to_dict('records') %}

| Year | Event / Activity | Audience / Venue |
|---|---|---|
{% for item in public_outreach -%}
| {{ item.year }} | {% if item.link %}[{{ item.event }}]({{ item.link }}){% else %}{{ item.event }}{% endif %} | {{ item.venue }} |
{% endfor %}

## Courses and Workshops

{% set courses_workshops = pd_read_json('data/courses_workshops.json').to_dict('records') %}

| Year(s) | Role | Course / Workshop | Institution / Venue |
|---|---|---|---|
{% for item in courses_workshops -%}
| {{ item.years }} | {{ item.role }} | {{ item.activity }} | {{ item.venue }} |
{% endfor %}
