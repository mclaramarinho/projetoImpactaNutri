import Endereco from "./Endereco.js";
import { Cliente, Nutricionista } from "./Usuario.js";


let nutri = null;
// CRIAR NOVO NUTRICIONISTA
try{
    // Cria primeiro o endereco
    const endereco = new Endereco(`12345567`, "rua dos barris", "bairro de viagem", "cidade viajada", "pe", 764, 'apt 201');
    // Cria o nutri
    nutri = new Nutricionista("02043091409", "andresa freire", "freire@mail.com","81983335168", "09/01/1977", endereco, "12345", "sou muito foda");
    
    // Atualiza a agenda
    nutri.atualizarAgenda("seg", [{inicio: 9, fim: 10, especialidade: "pediatria", valor: 299.90, isDisponivel: true, tipo: "O"}])
}catch(err){
    console.log(err);
}

// CRIAR NOVO CLIENTE
try{
    // Cria primeiro o endereco
    const endereco = new Endereco(`5102120`, "gen americano freire", "boa viagem", "recife", "pe", 164, 'apt 201');
    
    // Cria o cliente 1 com cpf invalido
    const cliente = new Cliente('7018447', 'clara marinho', 'marinho@gmail.com', '81984824755', '10/12/2000', endereco);
}catch(err){
    console.log(err);
}

// CRIAR NOVO CLIENTE
try{
    // Cria primeiro o endereco
    const endereco = new Endereco(`12345123`, "gen americano freire", "boa viagem", "recife", "pe", 764, 'apt 201');
    // Cria o cliente 2
    const cliente = new Cliente('12345678900', 'pessoa', 'pessoa@gmail.com', '81984824755', '10/12/2000', endereco);
    // Cadastra um novo cartao
    cliente.cadastrarCartao("nubank", "5555123456789012", "credito", "05/25", "70185974473");
}catch(err){
    console.log(err);
}

// CRIAR NOVO CLIENTE
try{
    // Cria primeiro o endereco
    const endereco = new Endereco(`12345123`, "gen americano freire", "boa viagem", "recife", "pe", 764, 'apt 201');
    // Cria o cliente 3
    const cliente = new Cliente('09876543210', 'pessoa2', 'pessoa2@gmail.com', '81984824755', '10/12/2000', endereco);
    
    // Cria um agendamento
    const dataConsulta = new Date();
    dataConsulta.setDate(25);
    dataConsulta.setMonth(4);
    dataConsulta.setFullYear(2024);
    dataConsulta.setHours(17);
    dataConsulta.setMinutes(0);
    cliente.agendarHorario("0912345pe", dataConsulta, "pediatria", 299.90);
    
    // Visualizar o atendimento 0
    console.log(cliente.get().atendimentos[0]);
    
    // Alterar o status do atendimento [0]
    cliente.get().atendimentos[0].pagar();

    // Visualizar o atendimento 0
    console.log(cliente.get().atendimentos[0]);
}catch(err){
    console.log(err);
}









