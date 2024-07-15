export class UtilDataHora {
  static primeiroDiaDaSemana(data) {
    const dataInicioSemana = new Date(data);
    dataInicioSemana.setDate(data.getDate() - data.getDay());
    return dataInicioSemana;
  }

  static ultimoDiaDaSemana(data) {
    const dataFimSemana = new Date(data);
    dataFimSemana.setDate(data.getDate() + (6 - data.getDay()));
    return dataFimSemana;
  }
  static proximoSabado(dataString: string) {
    const hoje = new Date(dataString);
    const proximoSabado = new Date();
    proximoSabado.setDate(hoje.getDate() + ((6 - hoje.getDay() + 7) % 7));
    return proximoSabado;
  }

  static dataHoraAtualFormatada() {
    const hoje = new Date();
    return hoje.toLocaleString('pt-BR');
  }

  // Método estático para calcular a diferença em horas entre duas datas
  static diferencaEmHoras(data1, data2) {
    const diffEmMs = Math.abs(data2 - data1);
    const horas = Math.floor(diffEmMs / (1000 * 60 * 60));
    return horas;
  }
}
