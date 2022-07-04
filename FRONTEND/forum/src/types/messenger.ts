export default interface IMessenger {
  _id: string;
  isGroup: boolean;
  participants: [
    {
      _id: string;
      name: string;
    }
  ];
  messages: {
    content: string;
    user: {
      _id: string;
      name: string;
    };
    createdAt: string;
    _id: string;
  };
  updatedAt: string;
}
