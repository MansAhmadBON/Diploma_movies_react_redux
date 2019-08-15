import React from "react";
import Form from '../../components'
import ContainerCounterAndSort from '../../components/containerCounterAndSort'
import ContainerFilms from '../../components/ContainerFilms'
import Footer from '../../components/Footer'
import ModalWindow from '../../components/modalWindow'
import { connect } from 'react-redux'
import actionInputValue from '../../actions/actionInputValue'
import actionGetData from '../../actions/actionGetData'
import actionSearchByTitle from '../../actions/actionSearchByTitle'
import actionSearchByGanre from '../../actions/actionSearchByGanre'
import actionTargetFlim from '../../actions/actionTargetFlim'
import actionSortByRating from '../../actions/actionSortByRating'
import actionSortByRelease from '../../actions/actionSortByRelease'


class Main extends React.Component {

    render(){
        //console.log(this.props.sortBy)
        if(this.props.dataFilms && this.props.inputValue !== ''){
            const filteredFilms = this.props.dataFilms.filter( item => {
                if(this.props.searchBy === 'title'){
                    return item.title.includes(this.props.inputValue) 
                } else if(this.props.searchBy === 'ganre'){
                    return item.genres.includes(this.props.inputValue) 
                } else {
                    return item.title.includes(this.props.inputValue) 
                }
            })
            return (
                <div>
                    <Form 
                        getInputValue={this.props.getInputValue}
                        getMovisData={this.props.getMovisDataFromAPI}
                        searchByGanre={this.props.searchByGanre}
                        searchByTitle={this.props.searchByTitle}
                    />
                    <main>
                        <ContainerCounterAndSort 
                            sortByRating={this.props.sortByRating}
                            sortByRelease={this.props.sortByRelease}
                        />
                        <ContainerFilms 
                            dataFilms={filteredFilms}
                            getTargetFilm={this.props.getTargetFilm}
                            sortBy={this.props.sortBy}
                        />
                    </main>
                    <Footer />
                    <ModalWindow
                        dataFilms={this.props.dataFilms}
                        targetFilm={this.props.targetFilm}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <Form 
                        getInputValue={this.props.getInputValue}
                        getMovisData={this.props.getMovisDataFromAPI}
                        searchByGanre={this.props.searchByGanre}
                        searchByTitle={this.props.searchByTitle}
                    />
                    <Footer />
                </div>
            )
        }
    }
}




const mapStateToProps = props => {
    return {
        inputValue: props.inputValue.value,
        dataFilms: props.dataFilms.data,
        searchBy: props.searchFilmsBy.searchBy,
        targetFilm: props.targetFilm.target,
        sortBy: props.sortBy.sortBy
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getInputValue: (newValue) => dispatch(actionInputValue(newValue)),
        getMovisDataFromAPI: () => dispatch(actionGetData()),
        searchByGanre: () => dispatch(actionSearchByGanre()),
        searchByTitle: () => dispatch(actionSearchByTitle()),
        getTargetFilm: (target) => dispatch(actionTargetFlim(target)),
        sortByRating: () => dispatch(actionSortByRating()),
        sortByRelease: () => dispatch(actionSortByRelease())
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)