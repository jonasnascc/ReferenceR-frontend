export type Deviation = {
    id: number,
    title: string,
    url: string,
    thumbUrl : string,
    mature: boolean,
    type: string,
    matureLevel: string,
    deviationPage: string,
    license: string,
    tags : {name:string, url:string} []
    selected ?: boolean
}