import dynamic from "next/dynamic";

const CustMap = dynamic(() => import('./map'),{
    ssr: false
})

export default CustMap