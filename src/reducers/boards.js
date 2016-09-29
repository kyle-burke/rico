let idCounter = 0;

const boards = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return [
        ...state,
        {
          name: action.name,
          id: idCounter++,
          doubloons: action.doubloons,
          buildings: [],
          crops: []
        }
      ];
    case 'UPDATE_ACTIVE_PLAYER':
      return state.map((player, index) => {
        if (index === action.index) {
          return {
            ...player,
            active: true
          }
        }

        return {
          ...player,
          active: false
        }
      });
    case 'MODIFY_DOUBLOONS':
      const activeIndex = state.findIndex(p => p.active);

      return state.map((player,index) => {
        if (index !== activeIndex) {
          return player;
        }

        return {
          ...player,
          doubloons: player.doubloons + action.doubloons
        };
      });
    case 'ADD_BUILDING':
      // the number is because babel thinks you can't
      // declare variables multiple times in different
      // case blocks. dumb dumb dumb
      const activeIndex2 = state.findIndex(p => p.active);

      return state.map((player, index) => {
        if (index !== activeIndex2) {
          return player;
        }

        return {
          ...player,
          buildings: [
            ...player.buildings,
            {
              name: action.building.name,
              colonists: action.building.colonists
            }
          ]
        };
      });
    case 'ADD_CROP':
      // see above for number in variable name
      const activeIndex3 = state.findIndex(p => p.active);

      return state.map((player, index) => {
        if (index !== activeIndex3) {
          return player;
        }

        return {
          ...player,
          crops: [
            ...player.crops,
            {
              name: action.crop,
              colonists: [false]
            }
          ]
        };
      });
    default:
      return state;
  }
};

export { boards }
