import fs from "fs";

export function idGenerator(dbToCompare=""){
    if(dbToCompare.length === 0){
        return crypto.randomUUID();
    }
    try{
        let dados = fs.readFileSync(dbToCompare, "ascii");

        dados = JSON.parse(dados);

        if(dados.length === 0){
            return crypto.randomUUID();
        }

        while(true){
            const temp = crypto.randomUUID();

            const uuidExists = dados.filter(item => item.id === temp);

            if(uuidExists.length === 0){
                return temp;
            }
        }
    }catch(e){
        throw e;
    }
}