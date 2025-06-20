export default function stripTags (text){
    if ((text === null) || (text === '')) return false
    else text = text.toString()

    return text.replace(/(<([^>]+)>)/ig, '')
}