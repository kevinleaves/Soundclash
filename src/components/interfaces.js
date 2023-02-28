interface Track {
  album: Object
  artists: Array<any>,
  available_markets: Array<any>,
  disc_number: number,
  duration_ms: number,
  explicit: boolean,
  external_ids: Object,
  href: string,
  id: string,
  is_local: boolean,
  name: string,
  popularity: number,
  preview_url: string,
  track_number: number,
  type: string,
  uri: string
}

export default Track