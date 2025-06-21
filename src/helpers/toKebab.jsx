export default function toKebab(str){
    return str.trim().toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')
}