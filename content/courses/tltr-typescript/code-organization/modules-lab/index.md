---
title: Practicing Modules
module: Code Organization
type: course
cover: cover.jpg
order: 6100
youtubeVideoId:
articleSlug: /tltr-typescript-modules
---

In this lab, we will build a plain TypeScript project to practice modules.

If you’re new to TypeScript, and modules are a new thing for you, I highly recommend you practice the following examples. If you see any errors, try to search for and resolve them by yourself.

> There’s a magical thing happening when you try the things you’re learning. They stick. ☺️

If you spot a mistake in the examples below, or you want to suggest something, feel free to create a merge request. I would really appreciate your input.

### Prerequisites

This article assumes that you are familiar with TypeScript, and that you understand features like destructuring, and the spread operator.

### 1. Setting up a Type project 🎬

Open a terminal to a folder of your choice and run the following command:

```tsx
> npm init -y
```

Then install TypeScript as a development dependency:

```bash
> npm install --save-dev typescript
```

This will create a new `package.json` and then it will install `typescript` as a dependency. I’m currently using `4.9.5`, but any version after 4 is ok.

Our next step is to initialize a typescript project:

```bash
> npx tsc --init
Need to install the following packages:
  tsc@2.0.4
Ok to proceed? (y)
```

Press `y` and then you should have a `tsconfig.json` with the basic compiler configuration.

We’re going to edit that file to customize its configuration. Configure the `include` and the `outDir` properties:

```json
{
  // highlight-start
	"include": ["./index.ts"], 	/* We will use this file as a root */
  // highlight-end
	"compilerOptions": {
		...
    // highlight-start
		"outDir": "./dist" /* The compiler will output the files here */
    // highlight-end
	}
}
```

To compile the application we will run:

```bash
> npx tsc
```

And to test the result, we will run:

```bash
> node ./dist
```

### 2. A messy example to begin with 🥴

Let’s add some code to play with:

```tsx
type FileType = "mp3" | "wav" | "aac";

interface Track {
  title: string;
  artist: string;
  fileType?: FileType;
}

const DEFAULT_FILE_TYPE = 'mp3'

class Playlist {
  private tracks: Track[];

  constructor() {
    this.tracks = [];
  }

  addTrack(track: Track) {
    if (!track.fileType) {
      track.fileType = DEFAULT_FILE_TYPE;
    }
    this.tracks.push(track);
  }

  removeTrack(track: Track) {
    const index = this.tracks.indexOf(track);
    if (index !== -1) {
      this.tracks = [
        ...this.tracks.slice(0, index),
        ...this.tracks.slice(index + 1)
      ];
    }
  }

	getTracks(): Track[]
    return this.tracks;
  }
}
```

The code above is a very basic playlist class that allows you to do basic CRUD operations.

Now let’s try to use our class to create a playlist:

```tsx
const playlist = new Playlist()
const track1: Track = {
  title: 'Shape of You',
  artist: 'Ed Sheeran',
}
const track2: Track = {
  title: 'Thriller',
  artist: 'Michael Jackson',
  fileType: 'mp4',
}
const track3: Track = {
  title: 'Billie Jean',
  artist: 'Michael Jackson',
}
playlist.addTrack(track1)
playlist.addTrack(track2)
playlist.addTrack(track3)
console.log(playlist.getTracks())
```

The code above is adding 3 tracks to a `playlist` object.

Time to give it a try. If I try to run this code directly on Node.js, there will be an error, since only JavaScript code is supported. That’s why we need to run the following command to transpile your code to JavaScript:

```bash
> npx tsc
```

This will generate an `index.js` file, which we can then run:

```bash
> node ./dist
[
  { title: 'Shape of You', artist: 'Ed Sheeran', fileType: 'mp3' },
  { title: 'Thriller', artist: 'Michael Jackson', fileType: 'mp4' },
  { title: 'Billie Jean', artist: 'Michael Jackson', fileType: 'mp3' }
]
```

Looks like our code is working fine.

To spice things up, let’s add more logic. What if we had some filter functions?

```tsx
function filterByTitle(tracks: Track[], title: string) {
  return tracks.filter((track) => track.title.includes(title))
}

function filterByArtist(tracks: Track[], artist: string) {
  return tracks.filter((track) => track.artist.includes(artist))
}

function filterByFileType(tracks: Track[], fileType: FileType) {
  return tracks.filter((track) => track.fileType === fileType)
}
```

Now let’s filter our existing playlist for mp3 files:

```tsx
const mp3s = filterByFileType(playlist.getTracks(), 'mp3')
console.log('mp3s:', mp3s)
```

Testing our app once again, and the filtered items will appear on screen:

```tsx
> npx tsc
> node ./dist
...
mp3s: [
  { title: 'Shape of You', artist: 'Ed Sheeran', fileType: 'mp3' },
  { title: 'Billie Jean', artist: 'Michael Jackson', fileType: 'mp3' }
]
```

As you can see, the more functionality we add the more this code is becoming cumbersome, less readable, and its maintainability suffers dramatically.

Let’s fix that by introducing modules.

### 3. Module everything up 👩🏻‍💻🧑🏿‍💻

Now take a deep breath and try to use everything you’ve learned in the previous sections about modules. Organize the previous code, so that the class, the filter functions, and the main code are independent files. You may want to separate types to its own file as well.

Yes, time to go solo for a while. Stop with the reading and give it a try. You can then compare your solution with the one I wrote in the next section.

### 3. Introducing modules to the rescue 🙌

As a disclaimer, you may end up with a completely different setup in your project. That’s fine! As long as you have several modules, and the final result is the same, you’re on a good track.

The structure I ended up with is the following:

```
.
├── filters.ts
├── index.ts
├── Playlist.ts
├── types.ts
```

Let’s start with `types.ts`, which hosts _common_ types:

```tsx
// types.ts
export type FileType = 'mp3' | 'mp4' | 'aac'

export interface Track {
  title: string
  artist: string
  fileType?: FileType
}
```

In `filters.ts` I used named exports for every function, since they are not related to each other, and someone may want to pick some of them to use:

```tsx
// filters.ts
import { FileType, Track } from './types'

export function filterByTitle(tracks: Track[], title: string) {
  return tracks.filter((track) => track.title.includes(title))
}

export function filterByArtist(tracks: Track[], artist: string) {
  return tracks.filter((track) => track.artist.includes(artist))
}

export function filterByFileType(tracks: Track[], fileType: FileType) {
  return tracks.filter((track) => track.fileType === fileType)
}
```

The `Playlist.ts` file contains our class:

```tsx
// Playlist.ts
// highlight-start
import { Track } from './types'
// highlight-end

const DEFAULT_FILE_TYPE = 'mp3'

class Playlist {
  private tracks: Track[]

  constructor() {
    this.tracks = []
  }

  addTrack(track: Track) {
    if (!track.fileType) {
      track.fileType = 'mp3'
    }
    this.tracks.push(track)
  }

  removeTrack(track: Track) {
    const index = this.tracks.indexOf(track)
    if (index !== -1) {
      this.tracks = [
        ...this.tracks.slice(0, index),
        ...this.tracks.slice(index + 1),
      ]
    }
  }

  getTracks(): Track[] {
    return this.tracks
  }
}

// highlight-start
export default Playlist
// highlight-end
```

The PascalCase in the file name here indicates that classes in this project will follow this naming convention. In general, you are free to use your own naming conventions. I am preparing another article to talk about that.

And last but not least, our index.ts file:

```tsx
// index.ts
import Playlist from './Playlist'
import { filterByFileType } from './filters'
import { Track } from './types'

const playlist = new Playlist()
const track1: Track = {
  title: 'Shape of You',
  artist: 'Ed Sheeran',
}
const track2: Track = {
  title: 'Thriller',
  artist: 'Michael Jackson',
  fileType: 'mp4',
}
const track3: Track = {
  title: 'Billie Jean',
  artist: 'Michael Jackson',
}
playlist.addTrack(track1)
playlist.addTrack(track2)
playlist.addTrack(track3)
console.log(playlist.getTracks())

const mp3s = filterByFileType(playlist.getTracks(), 'mp3')
console.log('mp3s:', mp3s)
```

Boy this looks so small! 🙀

Mind the different ways we import each module. You may also want to check the contents of the `dist` folder, to see how TypeScript managed to transpile our code. Pretty weird, right?

I hope you managed to come up with a similar result.

### 4. Bonus step 👨🏻‍🎨

Now let’s experiment with the CommonJS approach. Read the instructions in [my article](/tltr-typescript-modules/) and try to refactor the code to use CommonJS instead of ES Modules.
