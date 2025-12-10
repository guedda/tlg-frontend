export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case 'active':
      return 'Статус: Активен';
    case 'cooldown':
      return 'Статус: Cooldown';
    case 'finished':
      return 'Статус: Завершен';
    default:
      return status;
  }
};
