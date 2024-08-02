import { LightningElement } from 'lwc';
import LightningAlert from 'lightning/alert';

export default class QuizApp extends LightningElement {

    selected={}
    
    correctAnswer=0;
    myQuestions=[
        {
            id:1,
            question:'What is the capital of India?',
            options:['Delhi','Mumbai','Kolkata'],
            answer:0
        },
        {
            id:2,
            question:'Which one of the following is not a template loop?',
            options:['for Each','Iterator','List Loop'],
            answer:2
        },
        {
            id:3,
            question:'Which one of the following is invalid in LWC component folder?',
            options:['.svg','.apex','.js'],
            answer:1
        },
        {
            id:4,
            question:'Who is the President of Guatemala?',
            options:['Karin Herrera','Bernardo Arevalo','Guillermo Castillo Reyes'],
            answer:1
        }

    ]
    ls=this.myQuestions.length
    
    onChangeHandler(event){
        console.log(event.target.name);
        console.log(event.target.value);
        const {name,value}=event.target;
        this.selected={...this.selected,[name]:parseInt(value)}
    }
    async submitHandler(event){
        event.preventDefault();
        const correct = this.myQuestions.filter(item => this.selected[item.id] === item.answer);
        console.log(correct);
        this.correctAnswer = correct.length;
        console.log(this.correctAnswer);
        console.log('Inside submitHandler');
        if (this.correctAnswer === 0) {
            await LightningAlert.open({
                message: `You have selected ${this.correctAnswer} out of ${this.ls} questions correctly.`,
                theme: 'warning', // 'info', 'success', 'warning', 'error'
                label: 'Result'
            });
        } else if (this.correctAnswer === this.ls) {
            await LightningAlert.open({
                message: `You have selected ${this.correctAnswer} out of ${this.ls} questions correctly.`,
                theme: 'success', // 'info', 'success', 'warning', 'error'
                label: 'Result'
            });
        } else {
            await LightningAlert.open({
                message: `You have selected ${this.correctAnswer} out of ${this.ls} questions correctly.`,
                theme: 'info', // 'info', 'success', 'warning', 'error'
                label: 'Result'
            });
        }
        
    }
    resetHandler(){
        console.log('Inside resetHandler');
        this.selected={};
        this.correctAnswer=0;
    }
    get selectionCheck(){
        
        return !(Object.keys(this.selected).length===this.myQuestions.length);
    }
    
}