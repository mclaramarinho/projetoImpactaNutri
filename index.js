import Endereco from "./Endereco.js";
import { Cliente, Nutricionista } from "./Usuario.js";

const endereco = new Endereco(`51021120`, "gen americano freire", "boa viagem", "recife", "pe", 764, 'apt 201');
const cliente = new Cliente('70185974473', 'clara marinho', 'marinho@gmail.com', '81984824755', '10/12/2000', endereco);

cliente.cadastrarCartao("nubank", "5555123456789012", "credito", "05/25", "70185974473");

const endereco2 = new Endereco(`12345567`, "rua dos barris", "bairro de viagem", "cidade viajada",
                             "pe", 764, 'apt 201');


const nutri = new Nutricionista("02043091409", "andresa freire", "freire@mail.com",
                                "81983335168", "09/01/1977", endereco2, "12345", "sou muito foda");
nutri.atualizarAgenda("seg", [{inicio: 9, fim: 10, especialidade: "pediatria", valor: 299.90, isDisponivel: true, tipo: "O"}])

const dataConsulta = new Date();
dataConsulta.setDate(25);
dataConsulta.setMonth(4);
dataConsulta.setFullYear(2024);
dataConsulta.setHours(17);
dataConsulta.setMinutes(0);
cliente.agendarHorario("0912345pe", dataConsulta, "pediatria", 299.90);

cliente.get().atendimentos[0].pagar();

console.log(cliente.get().atendimentos[0]);