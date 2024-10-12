import { TVsitor } from "./visitor.interface"
import { Visitor } from "./visitor.module";


const visitorGetFromDB = async ( ) =>{
    const result = await Visitor.find();
    return result
}

const visitorAddIntoDB = async (payload : TVsitor ) =>{
    const result = await Visitor.findByIdAndUpdate( {_id : payload?.id}, {visitorCounter : payload?.visitorCounter} );
    return result;
}


export const visitorService = {
    visitorGetFromDB,
    visitorAddIntoDB
}