import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

//Remember reducers can't directly modify the state or fetch data from the server
// In redux we usually pass in the initial state as a default parameter
//Here the state domain is account
function reducer(state = initialState, action) {
  switch (action.type) {
    case "acount/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "acount/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return { ...state, loan: action.payload };
    case "account/payLoan":
      return {
        ...state,
        laon: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({ type: "acount/deposit", payload: 1000 });

console.log("State:", store.getState());
