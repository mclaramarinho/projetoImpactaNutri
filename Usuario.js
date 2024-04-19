import CartaoPagamento from "./CartaoPagamento.js";
import Agenda from "./Agenda.js";
import Endereco from "./Endereco.js";
import fs from "fs";
import Atendimento from "./Atendimento.js";

const clientes = './data/clientes.json';
const nutris = './data/nutricionistas.json';

/**
 * @abstract
 * @class
 */
class Usuario {
    _cpf;
    _nome;
    _email;
    _telefone;
    _dataNascimento;
    _endereco;

    constructor(cpf, nome, email, telefone, dataNascimento, endereco){
        try{
            // TODO - validar cpf
            
            // validar nome
            if(typeof(nome) !== "string"){
                throw "O nome deve ser do tipo string";
            }
            else if(nome.length === 0){
                throw "O nome nao pode estar vazio";
            }

            // TODO - validar email com regex
            // TODO - validar telefone
            // TODO - validar dataNascimento
            // TODO - validar endereco (cep, numero, complemento)
            
            // construtor endereco
            
            this._endereco = endereco;
            // Se der algum erro na construção -> catch e n precisa das outras operacoes
            
            this._cpf = cpf;
            this._nome = nome;
            this._email = email;
            this._telefone = telefone;
            this._dataNascimento = dataNascimento;
        }catch(e){
            throw e;
        }
    };
}

export class Cliente extends Usuario{
    #cartaoPagamento;
    #atendimentos;

    constructor(cpf, nome, email, telefone, dataNascimento, endereco){
        try{
            super(cpf, nome, email, telefone, dataNascimento, endereco);

            this.#cartaoPagamento = {};

            this.#atendimentos = [];

            this.updateBD();
        }catch(e){
            throw e;
        }

    };
    
    cadastrarCartao(apelido="", numero, tipo, validade, cpfTitular){
        try{
            const temp = new CartaoPagamento(apelido, numero, tipo, validade, cpfTitular);
            
            this.#cartaoPagamento = temp;
            this.updateBD()
        }catch(e){
            throw e;
        }
    };

    agendarHorario(idNutri, dataHora, especialidade, valor){
        try{
            const atendimento = new Atendimento(dataHora, idNutri, especialidade, this._cpf, valor);
            this.#atendimentos.push(atendimento);
            this.updateBD();
        }catch(err){
            return e;
        }
    };

    get(){
        try{
            return {
                cpf: this._cpf,
                nome: this._nome,
                email: this._email,
                telefone: this._telefone,
                dataNascimento: this._dataNascimento,


                // Getter de endereco
                endereco: this._endereco.get(),

                // Getter de cartaoPagamento
                cartaoPagamento: this.#cartaoPagamento.get(),
                atendimentos: this.#atendimentos
            }
        }catch(err){
            return {
                cpf: this._cpf,
                nome: this._nome,
                email: this._email,
                telefone: this._telefone,
                dataNascimento: this._dataNascimento,


                // Getter de endereco
                endereco: this._endereco.get(),

                // Getter de cartaoPagamento
                cartaoPagamento: null,
                atendimentos: this.#atendimentos
            }
        }
    };
    updateBD(){
        try{
            let arrData = fs.readFileSync(clientes, "ascii");
            arrData = JSON.parse(arrData);
            if(arrData.length > 0){
                arrData = arrData.map(cliente => {
                    if(cliente.cpf === this._cpf){
                        return this.get();
                    }else{
                        return cliente;
                    }
                })
            }else{
                arrData.push(this.get())
            }

            fs.writeFileSync(clientes, JSON.stringify(arrData));

            return "ok"

        }catch(err){
            throw err;
        }
    }
}


export class Nutricionista extends Usuario{
    #idNutri;
    #crn;
    #minicurriculo;
    _agenda;

    constructor(cpf, nome, email, telefone, dataNascimento, endereco, crn, minicurriculo){
        try{
            
            // TODO - Validar crn
            // TODO - Validar minicurriculo - ate 500 char
            
            super(cpf, nome, email, telefone, dataNascimento, endereco);


            this.#idNutri = this._cpf.substring(9, 12) + crn + endereco.get().uf;

            this.#crn = crn;
            this.#minicurriculo = minicurriculo;

            // TODO - Construtor agenda
            this._agenda = new Agenda(this.#idNutri);

            this.updateBD();

        }catch(e){
            throw e;
        }
    };

    get(){
        try{
            return {
                cpf: this._cpf,
                nome: this._nome,
                email: this._email,
                telefone: this._telefone,
                dataNascimento: this._dataNascimento,

                idNutri: this.#idNutri,
                crn: this.#crn,
                miniCurriculo: this.#minicurriculo,

                // Getter de endereco
                endereco: this._endereco.get(),

                // TODO - Getter agenda
                agenda: this._agenda.get()
            }
        }catch(e){
            return {
                cpf: this._cpf,
                nome: this._nome,
                email: this._email,
                telefone: this._telefone,
                dataNascimento: this._dataNascimento,

                idNutri: this.#idNutri,
                crn: this.#crn,
                miniCurriculo: this.#minicurriculo,

                // Getter de endereco
                endereco: {},

                // TODO - Getter agenda
                agenda: this._agenda.get()
            }
        }
    };

    atualizarAgenda(dia, horarios){
        try{
            this._agenda.adicionarDisponibilidade(dia, horarios);
            this.updateBD();
        }catch(e){
            throw e;
        }
    }

    updateBD(){
        try{
            let arrData = fs.readFileSync(nutris, "ascii");
            arrData = JSON.parse(arrData);
            if(arrData.length > 0){
                arrData = arrData.map(nutri => {
                    if(nutri.idNutri === this.#idNutri){
                        return this.get();
                    }else{
                        return nutri;
                    }
                })
            }else{
                arrData.push(this.get())
            }

            fs.writeFileSync(nutris, JSON.stringify(arrData));

            return "ok"

        }catch(err){
            throw err;
        }
    };

    
}