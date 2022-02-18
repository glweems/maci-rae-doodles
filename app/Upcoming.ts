// export interface Upcoming {
//   inseminationDate?: Date;
//   parents?: [string, string];
//   id?: Date;
//   momName?: string;
//   dateExpected?: Date;
//   momImages?: Image[];
//   mom?: string;
//   momEmbarkId?: [string, string];
//   names?: [string, string];
//   dadName?: string;
//   dadImages?: [Image, Image];
//   dad?: string;
//   dadEmbarkId?: [string, string];
//   embarkIds?: [string, string];
//   embarkUrls?: [string, string];
//   embarkImgUrls?: [string, string];
//   breedNames?: [string, string];
// }

// export interface Image {
//   id?: string;
//   width?: number;
//   height?: number;
//   url?: string;
//   filename?: string;
//   size?: number;
//   type?: Type;
//   thumbnails?: Thumbnails;
// }

// export interface Thumbnails {
//   small?: Full;
//   large?: Full;
//   full?: Full;
// }

// export interface Full {
//   url?: string;
//   width?: number;
//   height?: number;
// }

// export enum Type {
//   Imagejpeg = 'image/jpeg',
// }

// export interface Small {
// 	url: string;
// 	width: number;
// 	height: number;
// }

// export interface Large {
// 	url: string;
// 	width: number;
// 	height: number;
// }

// export interface Full {
// 	url: string;
// 	width: number;
// 	height: number;
// }

// export interface Thumbnail {
// 	small: Small;
// 	large: Large;
// 	full: Full;
// }

// export interface DadImage {
// 	id: string;
// 	width: number;
// 	height: number;
// 	url: string;
// 	filename: string;
// 	size: number;
// 	type: string;
// 	thumbnails: Thumbnail;
// }

// export interface Small {
// 	url: string;
// 	width: number;
// 	height: number;
// }

// export interface Large {
// 	url: string;
// 	width: number;
// 	height: number;
// }

// export interface Full {
// 	url: string;
// 	width: number;
// 	height: number;
// }

// export interface Thumbnail {
// 	small: Small;
// 	large: Large;
// 	full: Full;
// }

// export interface MomImage {
// 	id: string;
// 	width: number;
// 	height: number;
// 	url: string;
// 	filename: string;
// 	size: number;
// 	type: string;
// 	thumbnails: Thumbnail;
// }

// export interface Mom {
// 	name: string;
// 	embarkId: string;
// 	embarkUrl: string;
// 	breedName: string;
// 	birthday: string;
// }

// export interface Dad {
// 	name: string;
// 	embarkId: string;
// 	embarkUrl: string;
// 	breedName: string;
// 	birthday: string;
// }

// export interface RootObject {
// 	id: string;
// 	inseminationDate: string;
// 	parents: string[];
// 	dateExpected: string;
// 	dadImages: DadImage[];
// 	momImages: MomImage[];
// 	embark: string[];
// 	mom: Mom;
// 	dad: Dad;
// }
export interface Small {
  url: string;
  width: number;
  height: number;
}

export interface Large {
  url: string;
  width: number;
  height: number;
}

export interface Full {
  url: string;
  width: number;
  height: number;
}

export interface Thumbnail {
  small: Small;
  large: Large;
  full: Full;
}

export interface DadImage {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: Thumbnail;
}

export interface Small {
  url: string;
  width: number;
  height: number;
}

export interface Large {
  url: string;
  width: number;
  height: number;
}

export interface Full {
  url: string;
  width: number;
  height: number;
}

export interface Thumbnail {
  small: Small;
  large: Large;
  full: Full;
}

export interface MomImage {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: Thumbnail;
}

export interface Mom {
  name: string;
  embarkId: string;
  embarkUrl: string;
  breedName: string;
  birthday: string;
}

export interface Dad {
  name: string;
  embarkId: string;
  embarkUrl: string;
  breedName: string;
  birthday: string;
}

export interface UpcomingLittersData {
  id: string;
  inseminationDate: string;
  parents: string[];
  dateExpected: string;
  dadImages: DadImage[];
  momImages: MomImage[];
  embark: string[];
  mom: Mom;
  dad: Dad;
}
