import { View, StyleSheet, Text} from "react-native";
import { ExpensesList } from "./ExpensesList";
import { ExpensesSummary } from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";


export const ExpensesOutput = ({ expenses,expensesPeriod,fallBackText }) => {
    let content = <Text style={styles.infoText}>{fallBackText}</Text>;
    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod   } />
      {content}
    </View>
  );
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText:{
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
})