import React from 'react';
import ReactDOM from 'react-dom';
import { DragSource } from 'react-dnd';
import { DragDropContainer } from 'react-drag-drop-container';


      
        class Notes extends React.Component{ 
            constructor(props){
                super(props);

                this.state = {
                    notes:  [
                        {id: 1, text:"my text"},
                    ],
                    saveNotes: []
                }
            }

            saveData() {
                localStorage.setItem('text', JSON.stringify( this.state.notes ) )
            }

            loadData() {
                let text = JSON.parse(localStorage.getItem( 'text' ) );
                if(text) {
                    this.setState({
                        notes: text
                    })
                }
            }

            componentDidMount(){
                this.loadData();
        }
            
            handleClickAdd = () => {
                const newAdd = this.state.notes

                function srt( a, b){
                    return (b.id - a.id)
            }
            

                this.state.notes.sort(srt)
                let getId = this.state.notes[0].id +1
                console.log(getId)

                newAdd.push( { id: getId, text:"new note" } )

                    this.setState({
                        notes: newAdd
                })
                this.state.notes.sort( (a, b) => ( a.id - b.id ) )
            }


            handleClickDel = (e) => {
                const deleteSticker = e.target.parentElement.dataset.id

                if(deleteSticker > 1) {
                let newSticker = this.state.notes.filter( (el) => el.id != deleteSticker );

                    this.setState({
                        notes: newSticker
                    }, () => this.saveData());
                }
            }


            saveClick = (e) => {
                
                let id = e.target.parentElement.dataset.id;
                let text = e.target.parentElement.nextElementSibling.value;

                this.state.notes.forEach( (el, i) =>{
                    if( el.id==id ){
                        console.log(text);
                        this.state.notes[i].text = text;
                    }
                });

                
                console.log(this.state.notes);

                    this.setState({
                        notes: this.state.notes
                }, 
                    ()=>this.saveData());

            }

            
            

            render() {
                return (
                    <section>
                        <button className="add" onClick={ this.handleClickAdd }>Add</button>
                        {this.state.notes.map( (note, idx) => 

                            <MyStickyNotes save={ this.saveClick } close={ this.handleClickDel } key={ idx } note={note} /> )}

                    </section>
                );
            }
        }
       
        class MyStickyNotes extends React.Component {
            render() {
                return (
                    <DragDropContainer dragHandleClassName="drop" className='sticker'>

                        <div className="drop stickerBar" data-id={ this.props.note.id }>
                            <div onClick={this.props.close} className="close"></div>
                            <div onClick={ this.props.save } className="save"></div>
                        </div>

                        <textarea>{this.props.note.text}</textarea>

                    </DragDropContainer>
                )
            }
        }
        
        class App extends React.Component {
            render() {
                return(
                    <div>
                        <Notes />
                    </div>
                )
            }
        }


document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});