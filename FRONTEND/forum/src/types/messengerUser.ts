export default interface IMessengerUser {
  _id: string;
  isGroup: boolean;
  messages: [
    {
      content: string;
      user: {
        _id: string;
        name: string;
      };
      createdAt: string;
      _id: string;
    }
  ];
}
