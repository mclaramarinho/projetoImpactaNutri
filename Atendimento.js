import fs from "fs";
import updateDB from "./utils/updateDB.js";
import { verificarSeClienteExiste, verificarSeNutriExiste } from "./utils/check.js";
import {idGenerator} from "./utils/idGenerator.js"

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

            // validar o paciente, se consta na base de dados
            const pacienteExiste = verificarSeClienteExiste(cpfPaciente);
            if(!pacienteExiste){
                throw "O paciente indicado nao existe.";
            }

            // TODO - validar a nutricionista, se consta na base de dados
            const nutriExiste = verificarSeNutriExiste(idNutri);
            if(!nutriExiste){
                throw "A nutricionista indicada nao existe";
            }

            // TODO - validar valor

            
            this.#id = idGenerator("./data/atendimentos.json");
            
            this.#idNutri = idNutri;
            
            this.#dataHora = dataHora;
            this.#status = "naoConfirmada";

            this.#especialidade = especialidade;
            this.#cpfPaciente = cpfPaciente;
            this.#valor = valor;

            this.#URL = this.#gerarUrl();
            this.#materiais = [];

            updateDB(atendimentos, "id", this.#id, this);
        }catch(err){
            return err;
        }
    };

    #gerarUrl(){
        let code = [];

        for(let i = 0; i < 10; i++){
            
            while(true){
                const number = Math.floor(Math.random() * 123);

                if(number >= 97 && number <= 122){
                    code.push(String.fromCharCode(number));
                    break;
                }
            }

        }
        code = code.join("");
        code = `${code.substring(0, 3)}-${code.substring(3, 7)}-${code.substring(7,10)}`;

        const url = `meet.google.com/${code}`
        return url;
    };

    atualizarURL(){
        this.#URL = this.#gerarUrl();
        updateDB(atendimentos, "id", this.#id, this);
        return "ok";
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
    pagar(){
        try{
            if(this.#status !== "naoConfirmada"){
                throw `O atendimento ja foi pago e se encontra com status ${this.#status}.`
            }
            this.#status = "confirmada";
            updateDB(atendimentos, "id", this.#id, this);
            return "ok";
        }catch(e){
            throw e;
        }
    }
}