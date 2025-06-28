// import React, { useState } from 'react'
import { useAppcontext } from '../../store/state'

function CartCard({item}) {
    const { addCartItem, removeCartItem, updateCartItem } = useAppcontext()
    const selectedOptions= {}
    item.selectedAttributes.forEach(attr => {
        const textArray = attr.split(':')
        const name = textArray[0].charAt(0).toUpperCase() + textArray[0].slice(1)
        const value = textArray[1]
        selectedOptions[name] = value
    })

    const attributes = item.attributes.reduce((acc, attribute) => {
        acc[attribute.id] = attribute.options.map(opt=>({...opt, attributeString:`${attribute.id.toLowerCase()}:${opt.value}`}))
        return acc
    },{})
    const otherAttributesKeys = Object.keys(attributes).filter(key => !["Color", "Size", "Capacity"].includes(key))
    const otherAttributes = {}
    otherAttributesKeys.forEach(key =>{
        otherAttributes[key] = attributes[key]
    })

    function incrementQuantity(){
        addCartItem({
            id : item.productId,
            price: item.price,
            quantity: 1,
            attributes: item.selectedAttributes
        },()=>{console.log('+ item')})
    }
    function decrementQuantity(){
        console.log('----', item.quantity)
        if (item.quantity == 1){
                removeCartItem({
                    id : item.productId,
                    price: item.price,
                    quantity: item.quantity,
                    attributes: item.selectedAttributes
                }, ()=>{console.info('Item deleted')})
                return {}
            }
        addCartItem({
            id : item.productId,
            price: item.price,
            quantity: -1,
            attributes: item.selectedAttributes
        }, ()=>{console.log('- item')})
    }
    
    function updateItem(opt, value){
        let newOptions = {...selectedOptions}
        newOptions[opt] = value
        const newSelectedAttributes = []
        for (let attribute in newOptions){
                const attr = `${attribute.toLowerCase()}:${newOptions[attribute]}`
                newSelectedAttributes.push(attr)
            }
        const existingItem = {
            id : item.productId,
            price: item.price,
            quantity: item.quantity,
            attributes: item.selectedAttributes,
        }
        updateCartItem(existingItem, newSelectedAttributes)
        console.log('updated')
        

    }
  return (
    <article className='flex flex-row max-w-full h-56 max-h-60 p-0 border-b-2 border-lightGray'>
        <div className='w-1/2 flex flex-col justify-start items-center gap-1 py-4 px-2 overflow-y-auto'>
            <h1 className='w-full text-xl font-semibold text-left text-primaryText wrap-break-word'>{item.name}</h1>
            <p className='w-full text-lg font-normal text-left text-primaryText wrap-break-word'>${item.price}</p>
            {attributes.Size && (
                <div className='w-full flex flex-col gap-1'>
                    <h1 className='w-full text-left text-base font-medium'>Size:</h1>
                    <div className="flex flex-row justify-start items-center gap-1">
                        {attributes.Size.map(size => (
                            <button key={size.id} className={`w-8 h-7 align-middle p-0.5 text-center text-xs font-bold ${item.selectedAttributes.includes(size.attributeString)? 'bg-primaryText text-white' : 'bg-white text-primaryText border-2 border-secondaryText'}`}
                            onClick={()=>{updateItem('Size', size.value)}}>
                                {size.value}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {attributes.Capacity && (
                <div className='w-full flex flex-col gap-1'>
                    <h1 className='w-full text-left text-base font-medium'>Size:</h1>
                    <div className="flex flex-row justify-start items-center gap-1">
                        {attributes.Capacity.map(capacity => (
                            <button key={capacity.id} className={`w-10 h-7 align-middle p-0.5 text-center text-xs font-bold ${item.selectedAttributes.includes(capacity.attributeString)? 'bg-primaryText text-white' : 'bg-white text-primaryText border-2 border-secondaryText'}`}
                            onClick={()=>{updateItem('Capacity', capacity.value)}}>
                                {capacity.value}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {attributes.Color && (
                <div className='w-full flex flex-col gap-1'>
                    <h1 className='w-full text-left text-base font-medium'>Size:</h1>
                    <div className="flex flex-row justify-start items-center gap-1">
                        {attributes.Color.map(color => (
                            <button key={color.id} className={`w-5 h-5 align-middle p-0.5 text-center text-xs font-bold ${item.selectedAttributes.includes(color.attributeString)? 'border-2 border-white shadow-[0_0_0_3px_#5ECE7B] scale-85' : ' border border-secondaryText '}`} style={{backgroundColor: color.value}}
                            onClick={()=>{updateItem('Color',color.value)}}>
                                
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {otherAttributes.length != 0 && (
                otherAttributesKeys.map(key => (
                    <div className='w-full flex flex-col gap-1' key={key}>
                        <h1 className='w-full text-left text-base font-medium'>{key}:</h1>
                        <div className="flex flex-row justify-start items-center gap-1">
                            {otherAttributes[key].map(option => (
                                <button key={option.id} className={`w-10 h-7 align-middle p-0.5 text-center text-xs font-bold ${item.selectedAttributes.includes(option.attributeString)? 'bg-primaryText text-white' : ' bg-white text-primaryText border-2 border-secondaryText '}`}
                                onClick={()=>{updateItem(key, option.value)}}>
                                    {option.displayValue}
                                </button>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
        <div className='flex flex-row gap-2 w-1/2 items-center py-4'>
            <div className='flex flex-col justify-between items-center h-full'>
                <button className='w-7 h-7 rounded-xs border-2 border-secondaryText flex justify-center items-center p-1 text-xl font-semibold' 
                    onClick={incrementQuantity}>+</button>
                <span className='w-7 flex-auto bg-white text-primaryText flex justify-center items-center font-bold text-lg'>{item.quantity}</span>
                <button className='w-7 h-7 rounded-xs border-2 border-secondaryText flex justify-center items-center p-1 text-xl font-semibold'
                    onClick={decrementQuantity}>-</button>
            </div>
            <div className='p-1 w-4/5 h-11/12 flex justify-center items-center'>
                <img src={item.image} alt={item.name} className='object-scale-down aspect-square' />
            </div>
        </div>
    </article>
  )
}

export default CartCard