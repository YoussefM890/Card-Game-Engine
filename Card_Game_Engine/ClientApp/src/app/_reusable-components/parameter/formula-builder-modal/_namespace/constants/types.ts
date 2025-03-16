import {MethodEnum} from "../enums/method.enum";
import {TypeMetadata} from "../interfaces/models";

export const RootType: TypeMetadata = {
  id: 'Root',
  name: 'Root',
  methods: [
    {
      id: MethodEnum.GetPositions,
      display: 'positions',
      formulaDisplay: 'positions',
      parameters: [],
      returnType: 'Positions',
    },
  ]
}

export const PositionsType: TypeMetadata = {
  id: 'Positions',
  name: 'Positions',
  methods: [
    {
      id: MethodEnum.At,
      display: 'at',
      formulaDisplay: 'at',
      parameters: [
        {
          name: 'position',
          type: 'Number',
        },
      ],
      returnType: 'Position',
    },
  ]
}

export const PositionType: TypeMetadata = {
  id: 'Position',
  name: 'Position',
  methods: [
    {
      id: MethodEnum.GetCards,
      display: 'cards',
      formulaDisplay: 'cards',
      parameters: [],
      returnType: 'Cards',
    },
  ]
}

export const CardsType: TypeMetadata = {
  id: 'Cards',
  name: 'Cards',
  methods: [
    {
      id: MethodEnum.At,
      display: 'at',
      formulaDisplay: 'at',
      parameters: [
        {
          name: 'index',
          type: 'Number',
        },
      ],
      returnType: 'Card',
    },
  ]
}

export const CardType: TypeMetadata = {
  id: 'Card',
  name: 'Card',
  methods: [
    {
      id: MethodEnum.GetSuit,
      display: 'suit',
      formulaDisplay: 'suit',
      parameters: [],
      returnType: 'String',
    },
    {
      id: MethodEnum.GetRank,
      display: 'rank',
      formulaDisplay: 'rank',
      parameters: [],
      returnType: 'Number',
    },
  ]
}

export const NumberType: TypeMetadata = {
  id: 'Number',
  name: 'Number',
  methods: [
    {
      id: MethodEnum.Equals,
      display: 'equals',
      formulaDisplay: 'equals',
      parameters: [
        {
          name: 'other',
          type: 'Number',
        },
      ],
      returnType: 'Boolean',
    },
    {
      id: MethodEnum.BiggerThan,
      display: 'bigger than',
      formulaDisplay: 'biggerThan',
      parameters: [
        {
          name: 'other',
          type: 'Number',
        },
      ],
      returnType: 'Boolean',
    },
    {
      id: MethodEnum.SmallerThan,
      display: 'smaller than',
      formulaDisplay: 'smallerThan',
      parameters: [
        {
          name: 'other',
          type: 'Number',
        },
      ],
      returnType: 'Boolean',
    },
    {
      id: MethodEnum.BiggerOrEqual,
      display: 'bigger or equal to',
      formulaDisplay: 'biggerOrEqual',
      parameters: [
        {
          name: 'other',
          type: 'Number',
        },
      ],
      returnType: 'Boolean',
    },
    {
      id: MethodEnum.SmallerOrEqual,
      display: 'smaller or equal to',
      formulaDisplay: 'smallerOrEqual',
      parameters: [
        {
          name: 'other',
          type: 'Number',
        },
      ],
      returnType: 'Boolean',
    },
    {
      id: MethodEnum.Different,
      display: 'different from',
      formulaDisplay: 'different',
      parameters: [
        {
          name: 'other',
          type: 'Number',
        },
      ],
      returnType: 'Boolean',
    },
    // {
    //   id: 'Add',
    //   parameters: [
    //     {
    //       name: 'other',
    //       type: 'Number',
    //     },
    //   ],
    //   returnType: 'Number',
    // },
    // {
    //   id: 'Subtract',
    //   parameters: [
    //     {
    //       name: 'other',
    //       type: 'Number',
    //     },
    //   ],
    //   returnType: 'Number',
    // },
    // {
    //   id: 'Multiply',
    //   parameters: [
    //     {
    //       name: 'other',
    //       type: 'Number',
    //     },
    //   ],
    //   returnType: 'Number',
    // },
    // {
    //   id: 'Divide',
    //   parameters: [
    //     {
    //       name: 'other',
    //       type: 'Number',
    //     },
    //   ],
    //   returnType: 'Number',
    // },

  ]
}

export const BooleanType: TypeMetadata = {
  id: 'Boolean',
  name: 'Boolean',
  methods: [
    // {
    //   id: MethodEnum.Equals,
    //   display: 'equals',
    //   parameters: [
    //     {
    //       name: 'other',
    //       type: 'Boolean',
    //     },
    //   ],
    //   returnType: 'Boolean',
    // }
  ]
}

export const allTypes = [
  RootType,
  PositionsType,
  PositionType,
  CardsType,
  CardType,
  NumberType,
  BooleanType,
]
