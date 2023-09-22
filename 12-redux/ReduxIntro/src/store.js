import { createStore, combineReducers } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: ""
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: ""
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return { ...state, fullName: action.payload.fullName, nationalId: action.payload.nationalId, createdAt: action.payload.createdAt };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer
});

const store = createStore(rootReducer);

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
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

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName: fullName,
      nationalId: nationalId,
      createdAt: new Date().toISOString()
    }
  };
}

function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName
  };
}

console.log("------------------------------------");

store.dispatch(createCustomer("Bryan Guner", "123456789"));
console.log("Action: Create Customer\nState:", store.getState());
