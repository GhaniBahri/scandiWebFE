import { useState } from 'react'
import { useParams } from 'react-router'
import { useAppcontext } from '../store/state'
import { CiSquareChevRight, CiSquareChevLeft } from "react-icons/ci"
import ErrorPage from '../components/ErrorPage'
import parse from 'html-react-parser'

function ProductDetails() {
    const {product} = useParams()
    const {ProductById} = useAppcontext()
    const [picId, setPicId] = useState(0)
    const {loading, data, error} = ProductById(product)

    function Loading (){
        return (<section className='w-full h-fit p-10 flex justify-center items-center gap-20 flex-wrap animate-pulse'>
            <div className='w-96 h-96 rounded-lg bg-lightGray '></div>
            <div className='w-64 h-96 flex flex-col justify-start items-start gap-3'>
                <span className='w-4/5 h-4 bg-lightGray rounded-full mb-8'></span>
                <span className='w-1/5 h-2 bg-lightGray rounded-full'></span>
                <div className='flex flex-row w-full justify-start items-center gap-2 flex-wrap'>
                    <span className='w-10 h-6 rounded-sm bg-lightGray'></span>
                    <span className='w-10 h-6 rounded-sm bg-lightGray'></span>
                    <span className='w-10 h-6 rounded-sm bg-lightGray'></span>
                </div>
                <span className='w-1/5 h-2 bg-lightGray rounded-full'></span>
                <div className='flex flex-row w-full justify-start items-center gap-2 flex-wrap'>
                    <span className='w-10 h-6 rounded-sm bg-lightGray'></span>
                    <span className='w-10 h-6 rounded-sm bg-lightGray'></span>
                    <span className='w-10 h-6 rounded-sm bg-lightGray'></span>
                </div>
                <span className='w-1/5 h-2 bg-lightGray rounded-full'></span>
                <span className='w-2/5 h-2 bg-lightGray rounded-full'></span>
                <span className='w-3/5 h-14 bg-lightGray rounded-lg mx-auto mt-auto mb-8'></span>
                <span className='w-4/5 h-2 bg-lightGray rounded-full'></span>
                <span className='w-3/5 h-2 bg-lightGray rounded-full'></span>
            </div>
        </section>)
    }

    if (loading) return <Loading/>
    if (error) return <ErrorPage error={error} />

    const productData = data?.product
    if (!productData) return <ErrorPage/>
    const imagesArray = productData?.gallery 
    const attributes = {}
    productData?.attributes.forEach(attr => (attributes[attr.id] = attr))
    const attributeKeys = productData.attributes.map(attr => attr.id) 
    const otherAttributes = attributeKeys.filter(attr => !['Color', 'Capacity', 'Size'].includes(attr))
    const productDescription = parse(replaceNewLine(productData.description))

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
    function addCartItem(){
        console.log('item added')
    }
    function replaceNewLine(str){
        return str.replace(/\\n/g, '<br/>')
    }

  return (
    <section className='w-full h-fit flex flex-col lg:flex-row px-20 py-10 font-raleway'>
        <div className='w-full lg:max-h-[34rem] h-fit min-h-52 lg:w-3/5 p-8 flex flex-col-reverse justify-center items-center lg:justify-start  lg:flex-row gap-2'>
            {(imagesArray.length > 1) && (<ul className='gap-4 w-full lg:w-1/5 max-h-[32rem] flex flex-row justify-center items-center lg:flex-col px-3 overflow-x-auto lg:overflow-y-auto'>
                {imagesArray.map((pic, id) => (<img src={pic} key={id} width={60} height={60} className={`aspect-square min-w-14 min-h-14 max-w-20 max-h-20 lg:w-4/5 rounded-xs object-fill ${picId == id ? 'scale-90 border-4 p-1 border-primary inset-shadow-[0_0_8px_4px_rgba(255,255,255,0.5)]' :''}`} onClick={()=>selectPic(id)} />)) }
            </ul>)}
            <div className='w-4/5 max-w-xl p-2 group relative mx-auto'>
                <img src={imagesArray[picId]} alt={productData.name} width={200} height={200} className='max-w-full rounded-xs w-[32rem] h-[32rem]'/>
                {(imagesArray.length > 1) &&(<div className="w-full flex flex-row justify-between items-center opacity-0 absolute left-0 top-1/2 -translate-y-1/2 group-hover:opacity-100 transition-opacity duration-150 ease-out px-6">
                    <button className='w-10 h-10 rounded-xs overflow-hidden' onClick={prevPic}><CiSquareChevLeft className='w-full h-full bg-white text-gray-600' /></button>
                    <button className='w-10 h-10 rounded-xs overflow-hidden' onClick={nextPic}><CiSquareChevRight className='w-full h-full bg-white text-gray-600' /></button>
                </div>)}
            </div>
        </div>
        <div className='w-full lg:max-w-96 md:max-w-[34rem] h-fit lg:w-2/5 flex flex-col gap-6 justify-start items-center p-6 pt-10 mx-auto lg:ml-20 text-primaryText'>
            {!productData.inStock && (
                <h2 className='w-full uppercase text-left text-lg font-semibold -mb-6'>Out Of Stock</h2>
            )}
            <h1 className='w-full text-left text-5xl font-semibold mb-8'>{productData.name}</h1>
            {attributeKeys.includes('Size') && (
                <div className='w-full flex flex-col gap-2'>
                    <h2 className='w-full uppercase text-left text-lg font-semibold'>Size :</h2>
                    <div className="flex flex-row justify-start items-center gap-1">
                        {attributes.Size.options.map(size=>(<button key={size.id} className='w-14 h-9 align-middle border-2 border-secondaryText p-1 text-primaryText text-center text-sm font-bold'>{size.value}</button>))}
                    </div>
                </div>
            ) }
            {attributeKeys.includes('Capacity')? (
                <div className='w-full flex flex-col gap-2'>
                    <h2 className='w-full uppercase text-left text-lg font-semibold'>Capacity :</h2>
                    <div className="flex flex-row justify-start items-center gap-1">
                        {attributes.Capacity.options.map(capacity => (<button key={capacity.id} className='w-14 h-9 align-middle border-2 border-secondaryText p-1 text-primaryText text-center '>{capacity.displayValue}</button>))}
                    </div>
                </div>
            ) :''}
            {attributeKeys.includes('Color')? (
                <div className='w-full flex flex-col gap-2'>
                <h2 className='w-full uppercase text-left text-lg font-semibold'>Color :</h2>
                <div className="flex flex-row justify-start items-center gap-1">
                    {attributes.Color.options.map(color => (<button key={color.id} title={color.displayValue} className='w-6 h-6 border border-secondaryText' style={{backgroundColor: color.value}}></button>))}
                </div>
            </div>) : ''}
            {otherAttributes.length != 0 && (
                otherAttributes.map(attr => (
                    <div className='w-full flex flex-col gap-2' key={attr}>
                        <h2 className='w-full uppercase text-left text-lg font-semibold'>{attributes[attr].name} :</h2>
                        <div className="flex flex-row justify-start items-center gap-1">
                            {attributes[attr].options.map(item => (<button key={item.id}  className='w-14 h-9 align-middle border-2 border-secondaryText p-1 text-primaryText text-center '>{item.displayValue}</button>))}
                        </div>
                    </div>
                ))
            )}
            <div className='w-full flex flex-col gap-2'>
                <h2 className='w-full uppercase text-left text-lg font-semibold'>Price :</h2>
                <p className='w-full text-left text-xl font-semibold' >{productData.prices[0].currency.symbol+productData.prices[0].amount}</p>
            </div>
            <button className={`uppercase w-full h-16 text-white bg-primary text-center font-semibold text-xl rounded my-5 ${productData.inStock ? 'opacity-100 cursor-default' : 'opacity-60 cursor-not-allowed'}`} onClick={addCartItem} disabled={!productData.inStock}>add to cart</button>
            <div className='w-full font-normal text-lg text-left leading-7' >{productDescription}</div>
        </div>
    </section>
  )
}

export default ProductDetails