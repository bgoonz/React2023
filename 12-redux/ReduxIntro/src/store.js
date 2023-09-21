import { createStore } from "redux";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: ""
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
      return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount };
    case "account/payLoan":
      return {
        ...state,
        laon: 0,
        loanPurpose: "",
        balance: state.balance - state.loan
      };
    default:
      return state;
  }
}
const store = createStore(reducer);
// store.dispatch({ type: "acount/deposit", payload: 1000 });
// console.log("Action: Deposit\nState:", store.getState());
// 
// store.dispatch({ type: "acount/withdraw", payload: 100 });
// console.log("Action: Withdraw\nState:", store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payload: {
//     amount: 1000,
//     purpose: "Home Loan"
//   }
// });
// console.log("Action: Request Loan\nState:", store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log("Action: Pay Loan\nState:", store.getState());

function deposit(amount) {
  return { type: "acount/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "acount/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount: amount,
      purpose: purpose
    }
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}


store.dispatch(deposit(1000));
console.log("Action: Deposit\nState:", store.getState());
store.dispatch(withdraw(100));
console.log("Action: Withdraw\nState:", store.getState());
store.dispatch(requestLoan(1000, "Home Loan"));
console.log("Action: Request Loan\nState:", store.getState());
store.dispatch(payLoan());
console.log("Action: Pay Loan\nState:", store.getState());
