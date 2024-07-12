enum RegexPattern {
  EMAIL = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9.-]+[a-zA-Z0-9+_.-]",
  PASSWORD = "^(?=.*?[A-Z])(?=.*?[a-z]).{6,}$",
}

export default RegexPattern;
