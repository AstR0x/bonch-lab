/**
 * Класс, описывающий ошибки бэкенда
 */
export class ServerError extends Error {
  // Название ошибки
  name: string;

  // Сообщение ошибки
  message: string;

  // Статус ошибки
  status: number;

  /**
   * Создаёт серверную ошибку
   * @param message - сообщение ошибки
   * @param status - код ошибки
   */
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ServerError';
    this.message = message;
    this.status = status;
  }
}
