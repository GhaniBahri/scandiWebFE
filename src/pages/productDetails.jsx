import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAppcontext } from '../store/state'
import { CiSquareChevRight, CiSquareChevLeft } from "react-icons/ci"
import stripTags from '../../helpers/stripTags'

function ProductDetails() {
    const {product} = useParams()
    const [picId, setPicId] = useState(0)
    // const {productDetails, getProductDetails, products, getProductsByCategory, productCategory} = useAppcontext()
    // getProductsByCategory('tech')
    // const productData = products.filter(prod => prod.id == product)[0]
    const productData = {
    id: 'ps-5',
    name: 'PlayStation 5',
    inStock: true,
    gallery: [
        "https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg", 
        "https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg"],
    description: '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>',
    brand : "Sony",
    category : "tech",
    prices: [
        {amount: 844.02, currency: {label: "USD", symbol: "$"}, __typename: 'Price'}
    ],
    attributes : [         
        {
            id: 'Color',
            items: [
                {displayValue: 'Green', value: '#44FF03', id: 'Green', __typename: 'Attribute'},
                {displayValue: 'Cyan', value: '#03FFF7', id: 'Cyan', __typename: 'Attribute'},
                {displayValue: 'Blue', value: '#030BFF', id: 'Blue', __typename: 'Attribute'},
                {displayValue: 'Black', value: '#000000', id: 'Black', __typename: 'Attribute'},
                {displayValue: 'White', value: '#FFFFFF', id: 'White', __typename: 'Attribute'}
            ], 
            name: 'Color', 
            type: 'swatch',
            __typename: 'AttributeSet'
        }, 
        {
            id: 'Capacity', 
            items: [
                {displayValue: '512G', value: '512G', id: '512G', __typename: 'Attribute'},
                {displayValue: '1T', value: '1T', id: '1T', __typename: 'Attribute'}
            ], 
            name: 'Capacity', 
            type: 'text', 
            __typename: 'AttributeSet'
        }
    ]
    }
    // useEffect(()=> {
    //     getProductsByCategory('tech')
    //     imagesArray = productData?.gallery
    //     attributes = productData?.attributes.forEach(attr => ({...attributes, [attr.id] : attr}))
    // } , [productData])
    const imagesArray = productData?.gallery 
    const attributes = {}
    productData?.attributes.forEach(attr => (attributes[attr.id] = attr))
    const attributeKeys = productData.attributes.map(attr => attr.id) 
    const otherAttributes = attributeKeys.filter(attr => !['Color', 'Capacity', 'Size'].includes(attr))
    console.log('product gallery',imagesArray)
    console.log('product attributes',attributes)
    console.log('product data',otherAttributes ? true : false)
    
    function selectPic (id){
        setPicId(id)
    }
    function nextPic (){
        if (picId == (imagesArray.length - 1)){
            setPicId(0)
        } else {
            setPicId(picId + 1)
        }
    }
    function prevPic(){
        if (picId == 0){
            setPicId(imagesArray.length - 1)
        } else {
            setPicId (picId - 1)
        }
    }
     if (!productData) return <div className="p-10 animate-pulse">Loading product...</div>
  return (
    <main className='w-full h-fit flex flex-col lg:flex-row px-20 py-10 font-raleway'>
        <div className='w-full h-fit min-h-52 lg:w-3/5 p-8 flex flex-col-reverse justify-center items-center lg:justify-start  lg:flex-row gap-2'>
            <ul className='gap-4 w-1/5 max-h-[34rem] flex flex-row justify-center items-center lg:flex-col px-3'>
                {imagesArray.map((pic, id) => (<img src={pic} key={id} width={60} height={60} className={`aspect-square w-4/5 rounded-xs  ${picId == id ? 'scale-90 border-4 p-1 border-primary inset-shadow-[0_0_8px_4px_rgba(255,255,255,0.5)]' :''}`} onClick={()=>selectPic(id)} />)) }
            </ul>
            <div className='max-w-4/5 p-2 group relative'>
                <img src={imagesArray[picId]} alt={productData.name} width={200} height={200} className='max-w-full rounded-xs w-[34rem] h-[34rem]'/>
                <div className="w-full flex flex-row justify-between items-center opacity-0 absolute left-0 top-1/2 -translate-y-1/2 group-hover:opacity-100 transition-opacity duration-150 ease-out px-6">
                    <button className='w-10 h-10 rounded-xs overflow-hidden' onClick={prevPic}><CiSquareChevLeft className='w-full h-full bg-white text-gray-600' /></button>
                    <button className='w-10 h-10 rounded-xs overflow-hidden' onClick={nextPic}><CiSquareChevRight className='w-full h-full bg-white text-gray-600' /></button>
                </div>
            </div>
        </div>
        <div className='w-full max-w-96 h-fit lg:w-2/5 flex flex-col gap-6 justify-start items-center p-6 pt-10 text-primaryText'>
            <h1 className='w-full text-left text-5xl font-semibold mb-8'>{productData.name}</h1>
            {attributeKeys.includes('Size')? (
                <div className='w-full flex flex-col gap-2'>
                    <h2 className='w-full uppercase text-left text-lg font-semibold'>Size :</h2>
                    <div className="flex flex-row justify-start items-center gap-1">
                        {attributeKeys.Size.items.map(size=>(<button key={size.id} className='w-14 h-9 align-middle border-2 border-secondaryText p-1 text-primaryText text-center '>{size.displayValue}</button>))}
                    </div>
                </div>
            ) :''}
            {attributeKeys.includes('Capacity')? (
                <div className='w-full flex flex-col gap-2'>
                    <h2 className='w-full uppercase text-left text-lg font-semibold'>Capacity :</h2>
                    <div className="flex flex-row justify-start items-center gap-1">
                        {attributes.Capacity.items.map(capacity => (<button key={capacity.id} className='w-14 h-9 align-middle border-2 border-secondaryText p-1 text-primaryText text-center '>{capacity.displayValue}</button>))}
                    </div>
                </div>
            ) :''}
            {attributeKeys.includes('Color')? (
                <div className='w-full flex flex-col gap-2'>
                <h2 className='w-full uppercase text-left text-lg font-semibold'>Color :</h2>
                <div className="flex flex-row justify-start items-center gap-1">
                    {attributes.Color.items.map(color => (<button key={color.id} title={color.displayValue} className='w-6 h-6 border border-secondaryText' style={{backgroundColor: color.value}}></button>))}
                </div>
            </div>) : ''}
            {otherAttributes.length != 0 && (
                attributes[otherAttributes].map(attr => (
                    <div className='w-full flex flex-col gap-2'>
                        <h2 className='w-full uppercase text-left text-lg font-semibold'>{attr.name} :</h2>
                        {attr.items.map(item => (<button key={item.id}  className='w-14 h-9 align-middle border-2 border-secondaryText p-1 text-primaryText text-center '>{item.displayValue}</button>))}
                    </div>
                ))
            )}
            <div className='w-full flex flex-col gap-2'>
                <h2 className='w-full uppercase text-left text-lg font-semibold'>Price :</h2>
                <p className='w-full text-left text-xl font-semibold' >{productData.prices[0].currency.symbol+productData.prices[0].amount}</p>
            </div>
            <button className='uppercase w-full h-16 text-white bg-primary text-center font-medium rounded my-5'>add to cart</button>
            <p className='w-full font-normal text-lg text-left leading-7'>{stripTags(productData.description)}</p>
        </div>
    </main>
  )
}

export default ProductDetails