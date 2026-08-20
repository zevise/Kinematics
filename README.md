# Kinematics

A static course site for motion in one and two dimensions, following the HC Verma subtopics.
Nine topics, each with videos, worked examples, graded practice, a practical puzzle and an
interactive simulation. No build step, no dependencies.

## Publishing on GitHub Pages

1. Push this repo to GitHub.
2. Settings → Pages → Source: **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Save.
4. Wait a minute, then open `https://<username>.github.io/<repo>/`.

That is the whole setup. Everything is plain HTML, CSS and JavaScript served as files.

To preview locally:

```
python3 -m http.server 8000
```

then open http://localhost:8000. Opening `index.html` straight off the disk also works.

## Layout

```
index.html        topic list
topic.html        one topic, chosen by ?t=<slug>
sim.html          all nine simulations with a tab bar, ?t=<sim-id> jumps to one
data/topics.js    every piece of course content
assets/app.js     builds index.html and topic.html from the data
assets/sims.js    the simulations
assets/style.css  all styling, light and dark
0*.html           the old per-topic files, now redirects to the new URLs
```

## Adding a video

Open `data/topics.js`, find the video slot, paste the YouTube ID into its `yt` field:

```js
{t:"What 'at rest' actually means", covers:"...", mins:"6-8", yt:"dQw4w9WgXcQ"}
```

For `https://www.youtube.com/watch?v=dQw4w9WgXcQ` the ID is `dQw4w9WgXcQ`. Empty means the
slot shows a placeholder. Solved examples take a video the same way, using the same field.

## Adding a question

Append to the `exercises` array of any topic:

```js
{lv:"medium", q:"Question text.", sol:["First step.","Second step."], ans:"Final answer"}
```

`lv` is `easy`, `medium` or `hard`. The page sorts by level, so order in the file does not
matter. `sol` becomes a numbered list behind the reveal button.

Question and solution text is treated as HTML, so `<sub>` and `<sup>` work for subscripts
and superscripts. That also means a bare `<` will be swallowed. Write `&lt;` instead.

## What is in here

| | Count |
|---|---|
| Topics | 9 |
| Video slots | 45 |
| Solved examples | 18 |
| Practice questions | 90 (36 easy, 36 medium, 18 hard) |
| Practical puzzles | 9 |
| Classroom ideas | 27 |
| Simulations | 9 |

## The simulations

Each one is driven by the real equations rather than a decorative animation, so the numbers
on screen match what the formulas predict. Sliders sweep the full physical range without
producing nonsense. `g` is taken as 9.8 m/s² everywhere, matching the worked solutions.
