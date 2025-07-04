export default function itemInCart(obj, item){
    const newItemAttributes = [...item.attributes].sort()
    const existingItem = obj.findIndex(objectItem => {
        if (objectItem.productId !== item.id) return false
        if (objectItem.attributes.length !== item.attributes.length || 0) return false
        const existingitemAttributes = [...objectItem.attributes].sort()
        return existingitemAttributes.every((value, idx) => value === newItemAttributes[idx])
    })
    return existingItem >= 0 ? existingItem : false
}