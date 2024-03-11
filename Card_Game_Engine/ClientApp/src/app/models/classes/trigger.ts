export class TriggerDTO {
  id: string;
  name: string;
  parameters: { [key: string]: any };

  constructor(name: string, parameters: { [key: string]: any } = {}) {
    this.id = this.generateUniqueId();
    this.name = name;
    this.parameters = parameters;
  }

  private generateUniqueId(): string {
    return 'xxxx-xxxx-4xxx-yxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
export interface Trigger {
  id : number;
  display: string;
  // parameters?: Parameter[];
}

// export const triggers: Trigger[] = [
//   {
//     name: 'Game Start',
//   },
//   {
//     name: 'Turn Start',
//   },
//   {
//     name: 'Turn End',
//   },
//   {
//     name : 'Game End',
//   },
// ];

// export const actions: Trigger[] = [
//   {
//     name: 'Start Game',
//     parameters: [
//       {
//         key: 'shuffleDeck',
//         isRequired: true
//       },
//       {
//         key: 'numberOfCardsToDeal',
//         isRequired: true
//       },
//       {
//         key: 'directionOfDealing',
//         isRequired: true
//       },
//       {
//         key: 'equalCardsToAllPlayers',
//         isRequired: true
//       }
//     ]
//   },
//   {
//     name: 'End Game',
//     parameters: [
//       {
//         key: 'winningPlayer',
//         isRequired: true
//       }
//     ]
//   }
// ];
