// import React, { useState } from 'react'
import { useAppcontext } from '../../store/state'
import toKebab from '../../helpers/toKebab';

function CartCard({item}) { 
    const { addCartItem, removeCartItem } = useAppcontext()
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

    // updateItem, allow user to modify the order and select other options
    // import , updateCartItem from context
    // function updateItem(opt, value){
    //     let newOptions = {...selectedOptions}
    //     newOptions[opt] = value
    //     const newSelectedAttributes = []
    //     for (let attribute in newOptions){
    //             const attr = `${attribute.toLowerCase()}:${newOptions[attribute]}`
    //             newSelectedAttributes.push(attr)
    //         }
    //     const existingItem = {
    //         id : item.productId,
    //         price: item.price,
    //         quantity: item.quantity,
    //         attributes: item.selectedAttributes,
    //     }
    //     updateCartItem(existingItem, newSelectedAttributes)
    // }
  return (
    <article className='flex flex-col md:flex-row max-w-full h-56 max-h-60 w-full p-0 border-b-2 border-lightGray' >
        <div className='md:w-1/2 w-full flex flex-col justify-start items-center gap-1 py-4 px-2 overflow-y-auto'>
            <h1 className='w-full text-xl font-semibold text-left text-primaryText wrap-break-word'>{item.name}</h1>
            <p className='w-full text-lg font-normal text-left text-primaryText wrap-break-word' data-testid='cart-item-amount'>${item.price}</p>
            {attributes.Size && (
                <div className='w-full flex flex-col gap-1'>
                    <h1 className='w-full text-left text-base font-medium'>Size:</h1>
                    <div className="flex flex-row justify-start items-center gap-1" data-testid={`cart-item-attribute-size`}>
                        {attributes.Size.map(size => (
                            <span key={size.id} className={`flex justify-center items-center w-8 h-7 align-middle p-0.5 text-center text-xs font-bold ${item.selectedAttributes.includes(size.attributeString)? 'bg-primaryText text-white' : 'bg-white text-primaryText border-2 border-secondaryText'}`}
                            data-testid={`${item.selectedAttributes.includes(size.attributeString) ? 'cart-item-attribute-size-size-selected' : 'cart-item-attribute-size-size'}`}>
                                {size.value}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            {attributes.Capacity && (
                <div className='w-full flex flex-col gap-1'>
                    <h1 className='w-full text-left text-base font-medium'>Capacity:</h1>
                    <div className="flex flex-row justify-start items-center gap-1" data-testid={`cart-item-attribute-capacity`}>
                        {attributes.Capacity.map(capacity => (
                            <span key={capacity.id} className={`flex justify-center items-center w-10 h-7 align-middle p-0.5 text-center text-xs font-bold ${item.selectedAttributes.includes(capacity.attributeString)? 'bg-primaryText text-white' : 'bg-white text-primaryText border-2 border-secondaryText'}`}
                            data-testid={`${item.selectedAttributes.includes(capacity.attributeString) ? 'cart-item-attribute-capacity-capacity-selected' : 'cart-item-attribute-capacity-capacity'}`}>
                                {capacity.value}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            {attributes.Color && (
                <div className='w-full flex flex-col gap-1'>
                    <h1 className='w-full text-left text-base font-medium'>Color:</h1>
                    <div className="flex flex-row justify-start items-center gap-1" data-testid={`cart-item-attribute-color`}>
                        {attributes.Color.map(color => (
                            <span key={color.id} className={`flex justify-center items-center w-5 h-5 align-middle p-0.5 text-center text-xs font-bold ${item.selectedAttributes.includes(color.attributeString)? 'border-2 border-white shadow-[0_0_0_3px_#5ECE7B] scale-85' : ' border border-secondaryText '}`} style={{backgroundColor: color.value}}
                            data-testid={`${item.selectedAttributes.includes(color.attributeString) ? 'cart-item-attribute-color-color-selected':'cart-item-attribute-color-color'}`}>  
                            </span>
                        ))}
                    </div>
                </div>
            )}
            {otherAttributes.length != 0 && (
                otherAttributesKeys.map(key => (
                    <div className='w-full flex flex-col gap-1' key={key}>
                        <h1 className='w-full text-left text-base font-medium'>{key}:</h1>
                        <div className="flex flex-row justify-start items-center gap-1" data-testid={`cart-item-attribute-${toKebab(key)}`}>
                            {otherAttributes[key].map(option => (
                                <span key={option.id} className={`flex justify-center items-center w-10 h-7 align-middle p-0.5 text-center text-xs font-bold ${item.selectedAttributes.includes(option.attributeString)? 'bg-primaryText text-white' : ' bg-white text-primaryText border-2 border-secondaryText '}`}
                                 data-testid={item.selectedAttributes.includes(option.attributeString) ? `cart-item-attribute-${toKebab(key)}-${toKebab(key)}-selected` : `cart-item-attribute-${toKebab(key)}-${toKebab(key)}`}>
                                    {option.displayValue}
                                </span>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
        <div className='flex flex-row gap-2 w-full md:w-1/2 items-center py-4'>
            <div className='flex flex-row md:flex-col w-full md:w-1/5 justify-between items-center h-full'>
                <button className='w-7 h-7 rounded-xs border-2 border-secondaryText flex justify-center items-center p-1 text-xl font-semibold' 
                    onClick={incrementQuantity} data-testid='cart-item-amount-increase' >+</button>
                <span className='w-7 flex-auto bg-white text-primaryText flex justify-center items-center font-bold text-lg'>{item.quantity}</span>
                <button className='w-7 h-7 rounded-xs border-2 border-secondaryText flex justify-center items-center p-1 text-xl font-semibold'
                    onClick={decrementQuantity} data-testid='cart-item-amount-decrease'>-</button>
            </div>
            <div className='p-1 w-4/5 h-11/12 hidden md:flex justify-center items-center'>
                <img src={item.image} alt={item.name} className='object-scale-down aspect-square' />
            </div>
        </div>
    </article>
  )
}

export default CartCard