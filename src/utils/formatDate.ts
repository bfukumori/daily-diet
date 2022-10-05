export function formatDate(dateInMiliseconds: number, type: 'date' | 'time') {
  switch (type) {
    case 'date':
      return new Date(dateInMiliseconds).toLocaleDateString('pt-BR');
    case 'time':
      return new Date(dateInMiliseconds).toLocaleTimeString('pt-BR');
    default:
      return new Date().toLocaleDateString();
  }
}
