import CartaoPagamento from "./CartaoPagamento.js";
import Agenda from "./Agenda.js";
import Endereco from "./Endereco.js";
import Atendimento from "./Atendimento.js";
import updateDB from "./utils/updateDB.js";
import { isCampoVazio, validarCPF, validarDiasDaSemana, validarEmail, validarTamanho, validarTelefone } from "./utils/validate.js";

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
            // validar cpf
            validarCPF(cpf);

            // validar nome
            if(typeof(nome) !== "string"){
                throw "O nome deve ser do tipo string";
            }
            isCampoVazio(nome, "nome");
           

            // validar email com regex
            validarEmail(email);

            // validar telefone
            validarTelefone(telefone);

            // TODO - validar dataNascimento
            
            this._endereco = endereco;
            
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

            updateDB(clientes, "cpf", this._cpf, this);
        }catch(e){
            throw e;
        }

    };
    
    cadastrarCartao(apelido="", numero, tipo, validade, cpfTitular){
        try{
            const temp = new CartaoPagamento(apelido, numero, tipo, validade, cpfTitular);
            
            this.#cartaoPagamento = temp;
            updateDB(clientes, "cpf", this._cpf, this);
            return "ok";
        }catch(e){
            throw e;
        }
    };

    agendarHorario(idNutri, dataHora, especialidade, valor){
        try{
            const atendimento = new Atendimento(dataHora, idNutri, especialidade, this._cpf, valor);
            this.#atendimentos.push(atendimento);
            updateDB(clientes, "cpf", this._cpf, this);
            return "ok";
        }catch(err){
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
}


export class Nutricionista extends Usuario{
    #idNutri;
    #crn;
    #minicurriculo;
    _agenda;

    constructor(cpf, nome, email, telefone, dataNascimento, endereco, crn, minicurriculo){
        try{
            
            // TODO - Validar crn
            
            // Validar minicurriculo - ate 500 char
            validarTamanho(minicurriculo, 500, "minicurriculo");
            
            super(cpf, nome, email, telefone, dataNascimento, endereco);


            this.#idNutri = this._cpf.substring(8, 11) + crn + endereco.get().uf;

            this.#crn = crn;
            this.#minicurriculo = minicurriculo;

            // Construtor agenda
            this._agenda = new Agenda(this.#idNutri);
            updateDB(nutris, "idNutri", this.#idNutri, this);

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

                // Getter agenda
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

                // Getter agenda
                agenda: this._agenda.get()
            }
        }
    };

    atualizarAgenda(dia, horarios){
        try{
            validarDiasDaSemana(dia);

            this._agenda.adicionarDisponibilidade(dia, horarios);
            
            updateDB(nutris, "idNutri", this.#idNutri, this);
        }catch(e){
            throw e;
        }
    }    
}