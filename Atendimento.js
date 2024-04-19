import fs from "fs";

const atendimentos = './data/atendimentos.json';

export default class Atendimento {
    #id;
    #dataHora;
    #especialidade;
    #idNutri;
    #cpfPaciente;
    #status; // cancelada, naoConfirmada - confirmada - concluida
    #valor;
    #URL;
    #materiais;
    
    constructor(dataHora, idNutri, especialidade, cpfPaciente, valor){

        try{
            // TODO - validar dataHora, se consta na agenda da nutricionista indicada

            // TODO - validar especialidade, se consta na agenda da nutricionista indicada

            // TODO - validar o paciente, se consta na base de dados

            // TODO - validar a nutricionista, se consta na base de dados

            // TODO - validar valor

            
            this.#id = "";
            
            this.#idNutri = idNutri;
            
            this.#dataHora = dataHora;
            this.#status = "naoConfirmada";

            this.#especialidade = especialidade;
            this.#cpfPaciente = cpfPaciente;
            this.#valor = valor;

            this.#URL = this.gerarUrl();
            this.#materiais = [];

            this.updateBD();
        }catch(err){
            return err;
        }
    };

    gerarUrl(){
        // TODO - gerar URL da videochamada aleatorio

        return "url mock";
    };

    get(){
        return{
            id: this.#id,
            idNutri: this.#idNutri,
            dataHora: this.#dataHora,
            status: this.#status,
            especialidade: this.#especialidade,
            cpfPaciente: this.#cpfPaciente,
            valor: this.#valor,
            url: this.#URL,
            materiais: this.#materiais
        }
    }

    updateBD(){
        try{
            let arrData = fs.readFileSync(atendimentos, "ascii");
            arrData = JSON.parse(arrData);
            if(arrData.length > 0){
                arrData = arrData.map(at => {
                    if(at.id === this.#id){
                        return this.get();
                    }else{
                        console.log("outro");
                        return at;
                    }
                })
            }else{
                arrData.push(this.get())
            }

            fs.writeFileSync(atendimentos, JSON.stringify(arrData));

            return "ok"

        }catch(err){
            throw err;
        }
    };

    pagar(){
        try{
            this.#status = "confirmada";
            this.updateBD();
        }catch(e){
            throw e;
        }
    }
}