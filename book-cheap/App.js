import React, { Component } from 'react';
import { Platform,AppRegistry,Divider, TextInput ,ImageBackground, TouchableOpacity,StyleSheet,Text,Image,Picker,Button,View,ScrollView,Linking,} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Constants } from 'expo';


//Page d accueil
 class WelcomeClass extends Component {
   //Constructeur
  constructor(props) {
    super(props);
    this.state = { bookTosearch: '' ,bookError: null,placeColor:"gray",bookPlaceholder:"      Enter title or isbn",
    bookArray : [//Base de donnees des livres avec leurs informations
      {
        key:"Becoming",//Titre du livre
        isbn:"1524763136",//isbn du livre
        page:"BookToReadPage",//la page du livre
        image:"https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",

      },
      {
        key:"Thinking, Fast and Slow",
        isbn:"0374533555",
        page:"BookToReadPage",
        image:"https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg"
      },
      {
        key:"Keto For Women",
        isbn:"1628603704",
        page:"BookToReadPage",
        image:"https://images-na.ssl-images-amazon.com/images/I/51qsoBkkLbL._SX409_BO1,204,203,200_.jpg"
      },
      {
        key:"Cinderella",
        isbn:"1565543262",
        page:"BookToReadPage",
        image:"https://images-na.ssl-images-amazon.com/images/I/91jmsUHicwL.jpg",
      },

      
      ],};
  
  }
    //header
   static navigationOptions = ({ navigation}) => {
    return { 
       title: 'Book-Cheap',
        headerStyle: {
          backgroundColor: "#1E90FF",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
       headerRight: (
         <TouchableOpacity onPress={()=>navigation.navigate('HelpPage')}><Text style={{fontWeight: 'bold',fontSize: 20,marginRight:10,color:'#fff',textDecorationLine:"underline"}}>Help</Text>
         </TouchableOpacity>
         
      
    ),
      
    };  
        
      };

      //Methode pour recuperer les entrees de l utilisateur dans la barre de re
  setSearch(text){
    this.setState({
        bookTosearch: text,
    })}

    /*Prend en entree l isbn ou le titre du livre
    Cherche l index d un livre dans la base de donnee 
    retourne l index du livre ou -1 si le livre n'est pas disponible
    */
    getIndex(name) {

      var index=-1;
      for(let i = 0; i < this.state.bookArray.length; i++){
        var childArray = this.state.bookArray[i].key;
        var childIsbn=this.state.bookArray[i].isbn;
        if(childArray==name || childIsbn==name){
          index=i;
        }

      }
     
      return index;
}
    /*Verifie si l'utilisateur a entrer des donnees valides 
    et l envoie sur la page correspondante
     */
     validateBookSearch(){
       //Cas ou l'utilisateur n'a entrer aucune donnee mais appuye sur le bouton search.
     if (this.state.bookTosearch.trim() == "") {
       this.setSearch("");
       //Demande a l'utilisateur d'entrer un titre ou un isbn a rechercher
              this.setState(() => ({bookError: "." ,placeColor:"red",bookPlaceholder: "    book's title or isbn required" ,}));
              
      } 
      else {
          this.setState(() => ({ bookError: null ,placeColor:"gray",bookPlaceholder: "      Enter title or isbn" ,}));
      
    //Recupere le titre ou l'isbn du livre
      var bookTitle=this.state.bookTosearch;
      //recherche l'index dans la base de donnee
      var index=this.getIndex(bookTitle);
      var bookReference=this.state.bookTosearch;

      //Cas ou le livre n existe pas dans la base de donnee
      if(index<0){
        //Navigue vers la page notFoundPage ou on donne des suggestions a l'utilisateur
        this.props.navigation.navigate('NotFoundPage',{bookTosearch:bookReference});
        

      }
      else{//Cas ou le livre esxiste dans la base de donnee
        var page=this.state.bookArray[index].page;//recupere la page du livre
        //Navigue vers la page du livre
        this.props.navigation.navigate(page,{bookTitle:this.state.bookArray[index].key,bookIsbn:this.state.bookArray[index].isbn,lien:this.state.bookArray[index].image,author:"Katerina Diamond",price:"4$-10$",publication:"Published on July 11th 2019"});
      }}

    }


  render() {
    return (
      <View style={{flex:1,marginTop:2,}}>
      <ImageBackground source={{uri: 'https://ak8.picdn.net/shutterstock/videos/6307538/thumb/1.jpg'}} style={{width: 375, height: 200 ,flexDirection:"column",justifyContent: 'space-between'}}>

        <View>
        <Text style={ {fontSize: 20,marginTop:30,marginLeft:70, }}>
          Find the <Text style={{fontSize: 20, fontWeight: 'bold',marginTop:10,marginLeft:150,color:"#A52A2A" }}>Cheapest</Text> book price  </Text>

          <Text style={{fontSize: 20, marginTop:5,marginLeft:100, }}>
            & Save money
          </Text>
        </View>
        
        
      </ImageBackground>
      <View style={{flexDirection:"row", }} >
      {/* Bar de recherche en focntion du titre ou isbn
            */}
        <TextInput
            style={{height: 35,width:220, borderColor: "#1E90FF", borderWidth: 1,margin:10,}}
            onChangeText = {(text) => this.setSearch(text)}
            placeholder="      Enter title or isbn"
            placeholderTextColor={this.state.placeColor}

          />
          {/* Picker des pays couverts par l application
            */}
            <Picker
              style={{width: 130,}}
              selectedValue={this.state.language}
              onValueChange={(lang) => this.setState({language: lang})}>
              <Picker.Item label="Canada" value="Canada" />
              <Picker.Item label="Ireland" value="Ireland" />
              <Picker.Item label="New Zealand" value="New Zealand" />
              <Picker.Item label="USA" value="USA" />
            </Picker>
            
        </View>
        {/* Button Search pour valider la recherche
            */}
        <View style={{marginLeft:10,marginRight:15,width:300,height:30}}>
          <Button 
            title="Search"
            color="#1E90FF"
            onPress={() => this. validateBookSearch()}
           
      /></View>
      
  {/* Section des categories
            */}
     <Text style={{fontSize: 20,fontWeight: 'bold',textDecorationLine: 'underline',textAlign: 'center',
    marginTop:15,}}>
        Categories
       </Text>
       <ScrollView    style={{flex:4 ,flexDirection:"column",justifyContent: 'space-between', }}>

      {/* Categorie Children Books
            */}
      <View style={{marginTop:15,}}>
            <Text style={{marginLeft:15,marginTop:10,fontSize: 17,fontWeight: 'bold',color:"#483D8B"}}>
                    Children Books
          </Text>
           <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChildrenBook',{categorieName:"Children Books"})}>
            <ImageBackground source={{uri:"https://images-na.ssl-images-amazon.com/images/I/91n44kNS7IL.jpg" }} style={{width: 300, height: 175,marginLeft:15,marginRight:15,marginTop:5,}}>
           </ImageBackground>
          </TouchableOpacity>
          
      </View>

      {/* Categorie Business and Technology
            */}
      <View style={{marginTop:15,}}>
       <Text onPress={() => this.props.navigation.navigate('BusinessBook')}style={{marginLeft:15,marginTop:10,fontSize: 17,fontWeight: 'bold',color:"#483D8B"}}>
                    Business & Technology
          </Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('BusinessBook',{categorieName:"Business & Technology"})}>
            <ImageBackground source={{uri:"https://images-na.ssl-images-amazon.com/images/I/91cj-uzokkL.jpg" }} style={{width: 300, height: 175,marginLeft:15,marginRight:15,marginTop:5,}}>
           </ImageBackground>
          </TouchableOpacity>
          
      </View>

      {/* Categorie Fiction & Litterature
            */}
      <View style={{marginTop:15,}}>
          <Text style={{marginLeft:15,marginTop:10,fontSize: 17,fontWeight: 'bold',color:"#483D8B"}}>
                    Fiction & Literature
          </Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('FictionBook',{categorieName:"Fiction & Litterature"})}>
            <ImageBackground source={{uri:"https://images-na.ssl-images-amazon.com/images/I/91hPXkwnaeL.jpg" }} style={{width: 300, height: 175,marginLeft:15,marginRight:15,marginTop:5,}}>
           </ImageBackground>
          </TouchableOpacity>
          
      </View>
      {/* Categorie Romance
            */}

      <View style={{marginTop:15,}}>
          <Text onPress={()=>this.props.navigation.navigate('RomanceBook')} style={{marginLeft:15,marginTop:10,fontSize: 17,fontWeight: 'bold',color:"#483D8B"}}>
                   Romance
          </Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('RomanceBook',{categorieName:"Romance"})}>
            <ImageBackground source={{uri:"https://images-na.ssl-images-amazon.com/images/I/51ItBwnbJ6L.jpg" }} style={{width: 300, height: 175,marginLeft:15,marginRight:15,marginTop:5,}}>
           </ImageBackground>
          </TouchableOpacity>
          
      </View>

      {/* Categorie Health & Well Being
            */}
      <View style={{marginTop:15,}}>
       <Text style={{marginLeft:15,marginTop:10,fontSize: 17,fontWeight: 'bold',color:"#483D8B"}}>
                    Health & Well Being
          </Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('HealthBook',{categorieName:"Health & Well Being"})}>
            <ImageBackground source={{uri:"https://images-na.ssl-images-amazon.com/images/I/81wss9n7pwL.jpg" }} style={{width: 300, height: 175,marginLeft:15,marginRight:15,marginTop:5,}}>
           </ImageBackground>
          </TouchableOpacity>
         
      </View>
      {/* Categorie Other
            */}
      <View style={{marginTop:15,}}>
           <Text onPress={()=>this.props.navigation.navigate('OtherBook')} style={{marginLeft:15,marginTop:10,fontSize: 17,fontWeight: 'bold',color:"#483D8B"}}>
                   Other
          </Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('OtherBook',{categorieName:"Other"})}>
            <ImageBackground source={{uri:"https://images-na.ssl-images-amazon.com/images/I/51CY5V43XQL.jpg" }} style={{width: 300, height: 175,marginLeft:15,marginRight:15,marginTop:5,}}>
           </ImageBackground>
          </TouchableOpacity>
          <Text  style={{marginLeft:15,marginTop:10,fontSize: 17,fontWeight: 'bold',color:"#1E90FF"}}>
               
          </Text>
         
      </View>
      
       </ScrollView>

      </View>
    );
  }
}

//Syles principaux utilises
//Styles utilises pour les textes dans la classe Book
const styles = StyleSheet.create({
  titleText: {
    // style personnalise pour le titre de l'oeuvre
    fontWeight:"bold",
    fontSize:18,
    color:"#483D8B",
    marginLeft:5,
  },
  priceText: {
    //style personnalise pour le prix des livres
    color:"#A52A2A",
    fontWeight:"bold",
    marginTop:10,
    marginLeft:5,
  },
  otherText: {
    //style personnalise pour le nom de l'auteur ainsi que la date de publication
    marginTop:10,
    marginLeft:5,
    marginRight:5,
  },
  notation: {
    //style personnalise pour la partie notation du livre
    marginTop:30,
    height: 20,
    width:30,
    borderColor: "#A52A2A",
    borderWidth: 20,
    marginLeft:90,
    fontWeight:"bold",
    color:"white",
  },
  container: {
    paddingTop: Constants.statusBarHeight,
    marginRight:8,
    marginTop:-30,
  },
 
  
});

//Classe qui dit a l'utilisateur que les donnees qu'il recherche ne se trouve pas dans la base de donnee et lui donne des suggestions
class UnfoundPageClass extends Component {
  //Constructor
  constructor(props) {
    super(props);
    const bookTosearch=this.props.navigation.state.params.bookTosearch;
     this.state = {
      bookTosearch:bookTosearch,
    }
  }

  static navigationOptions = {
        title: 'Search Error',
        headerStyle: {
          backgroundColor: "#1E90FF",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        
        
        
      };
    
  render() {
    return (
      <View>
      {/* Error message
            */}
      
      <Text style={{marginLeft:10,marginTop:15,fontSize:20,}}>

      Sorry but your search for  <Text style={{color:"#A52A2A"}}>{this.state.bookTosearch}</Text>  doesn't match any of our products.
      
      </Text>
      {/* Suggestions
            */}
      
      <Text style={{fontSize: 20,fontWeight: 'bold',textDecorationLine: 'underline',textAlign:'center', marginTop:9, marginBottom:15}}>
      Suggestions
      </Text>
      {/* Suggestion1
            */}
      <Text style={{fontSize:20, marginLeft:10}}>
      Please ,make sure the spelling of the title is correct.{"\n"} </Text>
      
      <Text style={{fontSize:20, marginLeft:10}}>
      {/* Suggestion2
            */}
      
      Try more general keywords.
      </Text>
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
      <Text style={{fontSize:18, textDecorationLine:'underline',color:"#A52A2A", marginLeft:14, marginTop:10}}>
      {/* Suggestion3/Option de retourner a l'ecran d'accueil
            */}
        Back to the home page
      </Text>
      </TouchableOpacity>
 
      </View>
    );
    }
  }

/* Classe correcpondant a la categorie Children Books contenue dans la page d'accueil. Elle contient qurlques livres adaptes pour les enfants de bas age */

  class ChildrenBookClass extends Component {
  constructor(props) {
    super(props);
     const categoryName=this.props.navigation.state.params.categorieName; //on appelle le parametre afin de le passer comme en tete de la page
     this.state = {
      categoryName:categoryName,
    }
  }

  static navigationOptions = ({ navigation}) => {
    return { 
      title: navigation.getParam('categorieName'),
      headerStyle: {
          backgroundColor: "#1E90FF", //couleur de fond de l'en tete.
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: (
          //Dans ce cas, on place le lien Help au bout del'en tete afin d'y avoir acces en cas de besoin
         <TouchableOpacity onPress={()=>navigation.navigate('HelpPage')}><Text style={{fontWeight: 'bold',fontSize: 20,marginRight:10,color:'#fff',textDecorationLine:"underline"}}>Help</Text>
         </TouchableOpacity>
         
      
    ),
    };  
        
      };
    
  render() {
    return (
      /** Cette partie du code contient tous les livres contenus dans la classe children et sont affiches lorsqu'on clique sur l'icone de Children. Ces livres uront pour informations le titre du livre, le nom de l'auteur, la date de publication, la marge de prix ainsi que la notation sans oulier une image afin de donner a l'utilisateur un apercu du livre*/
      <ScrollView    style={{flex:4 ,flexDirection:"column",justifyContent: 'space-between', }}>
      <View>

      <View style={{marginRight:50,}}>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Cinderella",author:"RH Disney",lien:"https://images-na.ssl-images-amazon.com/images/I/91jmsUHicwL.jpg",price:"3$-20$",publication:"Published on July 31st 2010"})}> //recuperation des parametres afin de l'utiliser dans les autres pages
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://images-na.ssl-images-amazon.com/images/I/91jmsUHicwL.jpg"}}> //lien url de l'image
            </Image>
          </TouchableOpacity>

/** On appelera les parametres de style de la constante styles afin de pouvoir donner un style a chaque parametre  */
        <View id="livre1" style={{marginLeft:5, marginRight:5, width:150}}>
          <Text style={styles.titleText} > Cinderella </Text>
           <Text style={styles.otherText}>by RH Disney </Text> 
           <Text style={styles.priceText}> 3$-20$ </Text>
           <Text style={styles.otherText}> Published on July 31st 2010 </Text>
          <Text style={styles.notation}>
          4.7
        </Text>

        </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Tangled: Rapunzel's Tale",author:"Disney Book Group",lien:"https://images-na.ssl-images-amazon.com/images/I/519PU3zkyOL.jpg",price:"5$-20$",publication:"Published on October 25th 2010"})}> //recuperation des informations du livre
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://images-na.ssl-images-amazon.com/images/I/519PU3zkyOL.jpg"}}>
            </Image> //lien url de l'image du livre
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> Tangled: Rapunzel's Tale </Text>
         <Text style={styles.otherText}> Disney Book Group </Text> 
         <Text style={styles.priceText}> 5$-20$ </Text>
          <Text style={styles.otherText}> Published on October 25th 2010 </Text>
          <Text style={styles.notation}>
          4.5
        </Text>

        </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"My Little Pony: Rainbow Road Trip",author:"Celeste Sisler",lien:"https://images-na.ssl-images-amazon.com/images/I/51vYlgOP5BL._SX331_BO1,204,203,200_.jpg",price:"4$-25$",publication:"Published on June 25th 2019"})}> //ecuperation des informations concernant le livre
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://images-na.ssl-images-amazon.com/images/I/51vYlgOP5BL._SX331_BO1,204,203,200_.jpg"}}>
            </Image> //lien url de l'image
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> My Little Pony: Rainbow Road Trip </Text> 
         <Text style={styles.otherText}> Celeste Sisler </Text> 
         <Text style={styles.priceText}> 4$-25$ </Text>
         <Text style={styles.otherText}> Published on June 25th 2019 </Text>
          <Text style={styles.notation}>
          3.7
        </Text>

        </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10, marginBottom:20}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Arthur is off to school",author:"Marc Brown",lien:"https://images-na.ssl-images-amazon.com/images/I/61YLzXkv%2BAL._SX258_BO1,204,203,200_.jpg",price:"3$-20$",publication:"Published on June 25th 2019"})}> //recuperation des informations du livre
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://images-na.ssl-images-amazon.com/images/I/61YLzXkv%2BAL._SX258_BO1,204,203,200_.jpg"}}>
            </Image> //lien url de l'image
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> Arthur is off to school </Text>
         <Text style={styles.otherText}> Marc Brown </Text>
         <Text style={styles.priceText}> 3$-20$ </Text>
         <Text style={styles.otherText}> Published on June 25th 2019 </Text>
          <Text style={styles.notation}>
          2.7
        </Text>

        </View>
      </View>
    </View>

    <View>

    </View>
    

      </View>
      </ScrollView>
    );
    }
  }
/** Classe representant les livres contenues dans la categorie Business et Technology. cette classe contiendra quelques informations pour chaque livre tels que le titre du livre le nom de l'auteur, la date de publication, la marge du prix ainsi que l'image du livre afin d'aider l'utilisateur dans ses choix */
  class BusinessBookClass extends Component {//Estelle Class
  //Tu dois transmettre le titre l'isbn et l image de tes livres a Salwath comme je l ai fait
  constructor(props) {
    super(props);
     const categoryName=this.props.navigation.state.params.categorieName; //recuperation des donnees passees en parametres afin d'assigner cela comme titre de la page
     this.state = {
      categoryName:categoryName,
    }
  }

  static navigationOptions = ({ navigation}) => {
    return { 
      title: navigation.getParam('categorieName'),
      headerStyle: {
          backgroundColor: "#1E90FF",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: (
         <TouchableOpacity onPress={()=>navigation.navigate('HelpPage')}><Text style={{fontWeight: 'bold',fontSize: 20,marginRight:10,color:'#fff',textDecorationLine:"underline"}}>Help</Text> //lien vers la page help de l'application
         </TouchableOpacity>
         
      
    ),
    };  
        
      };
    
  render() {
    return (
      <ScrollView    style={{flex:4 ,flexDirection:"column",justifyContent: 'space-between', }}>
      <View>

      <View style={{marginRight:50,}}>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Becoming",author:"Michelle Robinson-Obama",lien:"https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",price:"17$-40$",publication:"Published on November 13th 2018"})}> //recuperation des donnees concernant le livre afin de l'envoyer aux autres pages qui aimeraient l'utiliser
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg"}}>
            </Image> //lien url de l'image du livre
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> Becoming </Text>
         <Text style={styles.otherText}> Michelle Robinson-Obama </Text> 
         <Text style={styles.priceText}> 17$-40$ </Text>
         <Text style={styles.otherText}> Published on November 13th 2018 </Text>
          <Text style={styles.notation}>
          4.7
        </Text>

        </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Thinking, Fast and Slow",author:"Daniel Kahneman",lien:"https://images-na.ssl-images-amazon.com/images/I/41Znfe5XqgL._SX343_BO1,204,203,200_.jpg",price:"15$-45$",publication:"Published on November 1st 2011"})}> //recuperation des donnees concernant le livre
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://images-na.ssl-images-amazon.com/images/I/41Znfe5XqgL._SX343_BO1,204,203,200_.jpg"}}>
            </Image> //lien url correpondant a l'image represente
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> Thinking, Fast and Slow </Text> 
         <Text style={styles.otherText}> Daniel Kahneman </Text> 
         <Text style={styles.priceText}> 15$-45$ </Text>
         <Text style={styles.otherText}> Published on November 1st 2011 </Text>
          <Text style={styles.notation}>
          4.2
        </Text>

        </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"The Plaza",author:"Julie Satow",lien:"https://images-na.ssl-images-amazon.com/images/I/41v0b001ouL._SX331_BO1,204,203,200_.jpg",price:"17$-40$",publication:"Published on June 4th 2019"})}> //recuperation des informations concernant le livre vers d'autres pages
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://images-na.ssl-images-amazon.com/images/I/41v0b001ouL._SX331_BO1,204,203,200_.jpg"}}>
            </Image> //lien url de l'image
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> The Plaza </Text>
         <Text style={styles.otherText}> Julie Satow </Text> 
         <Text style={styles.priceText}> 17$-40$ </Text>
         <Text style={styles.otherText}> Published on June 4th 2019 </Text>
          <Text style={styles.notation}>
          3.7
        </Text>

        </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10, marginBottom:20}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Reboot",author:"Jerry Colonna",lien:"https://i.harperapps.com/covers/9780062749536/x510.jpg",price:"17$-40$",publication:"Published on June 18th 2019"})}> //recuperation des donnes vers d'autres pages
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://i.harperapps.com/covers/9780062749536/x510.jpg"}}>
            </Image> //lien url de l'image
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> Reboot </Text>
         <Text style={styles.otherText}> Jerry Colonna </Text>
         <Text style={styles.priceText}> 17$-40$ </Text>
         <Text style={styles.otherText}>  Published on June 18th 2019 </Text>
          <Text style={styles.notation}>
          2.7
        </Text>

        </View>
      </View>
    </View>
    <View>

    </View>

      </View>
      </ScrollView>
    );
    }
  }

  class FictionBookClass extends Component {//Estelle Class
  //Tu dois transmettre le titre l'isbn et l image de tes livres a Salwath comme je l ai fait
  constructor(props) {
    super(props);
     const categoryName=this.props.navigation.state.params.categorieName; // appel du parametre afin de le placer comme en tete de la page
     this.state = {
      categoryName:categoryName,
    }
  }

  static navigationOptions = ({ navigation}) => {
    return { 
      title: navigation.getParam('categorieName'),
      headerStyle: {
          backgroundColor: "#1E90FF",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: (
         <TouchableOpacity onPress={()=>navigation.navigate('HelpPage')}><Text style={{fontWeight: 'bold',fontSize: 20,marginRight:10,color:'#fff',textDecorationLine:"underline"}}>Help</Text> //lien vers la page Help de l'application mobile
         </TouchableOpacity>
         
      
    ),
    };  
        
      };
    
  render() {
    return (
      <ScrollView    style={{flex:4 ,flexDirection:"column",justifyContent: 'space-between', }}>
      <View>

      <View style={{marginRight:50,}}>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Truth or Die",author:"Katerina Diamond",lien:"https://i.harperapps.com/covers/9780008282936/x510.jpg",price:"4$-10$",publication:"Published on July 11th 2019"})}> //recuperation des donnees afin de les utiliser correctement dans les autres pages
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://i.harperapps.com/covers/9780008282936/x510.jpg"}}> //lien url de l'image du livre
            </Image>
          </TouchableOpacity>


      <View id="livre1" style={{marginLeft:5, marginRight:5, width:150}}>
          <Text style={styles.titleText} > Truth or Die </Text>
           <Text style={styles.otherText}>by Katerina Diamond </Text> 
           <Text style={styles.priceText}>4$-10$ </Text>
           <Text style={styles.otherText}>Published on July 11th 2019 </Text>
          <Text style={styles.notation}>
          4.7
        </Text>

      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Hideaway",author:"Nicole Lundrigan",lien:"https://pbs.twimg.com/media/D6J9ikkWsAAuDGu.jpg",price:"13.99$-40$",publication:"Published on July 9th 2019"})}> //recuperation des donnees afin de les utiliser dans les autres pages
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://pbs.twimg.com/media/D6J9ikkWsAAuDGu.jpg"}}>
            </Image> //lien url de l'image
          </TouchableOpacity>

          <View id="livre1" style={{marginLeft:5, marginRight:5, width:150}}>
          <Text style={styles.titleText} > Hideaway</Text>
           <Text style={styles.otherText}>by Nicole Lundrigan</Text> 
           <Text style={styles.priceText}>13.99$-40$ </Text>
           <Text style={styles.otherText}> Published on July 9th 2019 </Text>
          <Text style={styles.notation}>
          4.1
        </Text>

      </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"The sum of all Shadows",author:"Eric Van Lustbader",lien:"https://images-na.ssl-images-amazon.com/images/I/51HxvFADZ1L._SX329_BO1,204,203,200_.jpg",price:"15.99$-46.99$",publication:"Published on July 9th 2019"})}> //recuperation des donnees concernen les informations du livre afin de les utiliser dans d'autres pages.
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://images-na.ssl-images-amazon.com/images/I/51HxvFADZ1L._SX329_BO1,204,203,200_.jpg"}}>
            </Image> //lien url de l'image
          </TouchableOpacity>


         <View id="livre1" style={{marginLeft:5, marginRight:5, width:150}}>
          <Text style={styles.titleText} >The sum of all Shadows </Text>
           <Text syle={styles.otherText}>by Eric Van Lustbader</Text> 
           <Text style={styles.priceText}>15.99$-46.99$</Text>
           <Text style={styles.otherText}> Published on July 9th 2019 </Text>
          <Text style={styles.notation}>
          3.7
        </Text>

      </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10, marginBottom:20}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Beautiful Bad",author:"Annie Ward",lien:"https://i.harperapps.com/covers/9781443456241/y450-274.jpg",price:"2.99$-21.99$",publication:"Published on March 5th 2019"})}> //recuperation des donnes concernant les informations du livre afin de les utiliser dans d'autres pages
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://i.harperapps.com/covers/9781443456241/y450-274.jpg"}}>
            </Image> //lien url de l'image
          </TouchableOpacity>

        

        <View id="livre1" style={{marginLeft:5, marginRight:5, width:150}}>
          <Text style={styles.titleText} >Beautiful Bad</Text>
           <Text style={styles.otherText}>by Annie Ward</Text> 
           <Text style={styles.priceText}>2.99$-21.99$ </Text>
           <Text style={styles.otherText}> Published on March 5th 2019 </Text>
          <Text style={styles.notation}>
         2.5
        </Text>

      </View>
      </View>
    </View>
    

    </View>

      </View>
      </ScrollView>
    );
    }
  }

/** classe contenant les livres pour la classe Romance de l'application. Chaque livre aura comme information le titre de l'oeuvre, le nom de l'auteur, la marge de prix, la date de publication, une notation aisni qu'une image afin d'aider l'utilisateur dans ses choix */
  class RomanceBookClass extends Component {//Estelle Class
  //Tu dois transmettre le titre l'isbn et l image de tes livres a Salwath comme je l ai fait
  constructor(props) {
    super(props);
     const categoryName=this.props.navigation.state.params.categorieName;
     this.state = {
      categoryName:categoryName,
    }
  }

  static navigationOptions = ({ navigation}) => {
    return { 
      //recuperation du titre de l'en tete a partir des donnees passees en parametres
      title: navigation.getParam('categorieName'),
      headerStyle: {
          backgroundColor: "#1E90FF",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: (
         <TouchableOpacity onPress={()=>navigation.navigate('HelpPage')}><Text style={{fontWeight: 'bold',fontSize: 20,marginRight:10,color:'#fff',textDecorationLine:"underline"}}>Help</Text>
         </TouchableOpacity> //lien vers la page Help du site
         
      
    ),
    };  
        
      };
    
  render() {
    return (
      <ScrollView    style={{flex:4 ,flexDirection:"column",justifyContent: 'space-between', }}>
      <View>

      <View style={{marginRight:50,}}>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Dax",author:"Annie Ward",lien:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1548358268l/42600149._SY475_.jpg",price:"7.99$-21.99$",publication:"Published on July 9th 2019"})}> //recuperation des information afin de l'utiliser dans les autres pages
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1548358268l/42600149._SY475_.jpg"}}>
            </Image> //lien url vers l'image du livre
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> Dax </Text> 
         <Text style={styles.otherText}> Sawyer Bennett </Text> 
          <Text style={styles.priceText}> 7.99$-21.99$ </Text> 
          <Text style={styles.otherText}> Published on July 9th 2019 </Text>
          <Text style={styles.notation}>
          4.7
        </Text>

        </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Superfan",author:"Sarina Bowen",lien:"https://images-na.ssl-images-amazon.com/images/I/51O1Ng04ONL.SX316.SY316.jpg",price:"4.99$-24.99$",publication:"Published on June 25th 2019"})}> //recuperation des donnes concernant le livre afin de les utiliser dans les autres pages
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://images-na.ssl-images-amazon.com/images/I/51O1Ng04ONL.SX316.SY316.jpg"}}>
            </Image> //lien url de l'image du livre
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> Superfan </Text> 
          <Text style={styles.otherText}> Sarina Bowen </Text>
          <Text style={styles.priceText}> 4.99$-24.99$ </Text>
          <Text style={styles.otherText}> Published on June 25th 2019 </Text>
          <Text style={styles.notation}>
          4.3
        </Text>

        </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookTitle:"Secret and Lies",bookIsbn:12345678900,author:"Roxy Love",lien:"https://is5-ssl.mzstatic.com/image/thumb/Publication113/v4/93/94/76/939476bc-a51d-a751-67a6-f52a4301de74/Secrets_and_Lies_Book_One-2.jpg/270x270bb-85.png",price:"4.99$-30.99$",publication:"Published on June 6th 2019"})}> //recuperation des donnes du livre pour les utiliser dans les autres pages
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://is5-ssl.mzstatic.com/image/thumb/Publication113/v4/93/94/76/939476bc-a51d-a751-67a6-f52a4301de74/Secrets_and_Lies_Book_One-2.jpg/270x270bb-85.png"}}>
            </Image> //lien url de l'image
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> Secret and Lies </Text>
         <Text style={styles.otherText}> Roxy Love </Text>
          <Text style={styles.priceText}> 4.99$-30.99$ </Text> 
         <Text style={styles.otherText}> Published on June 6th 2019 </Text>
          <Text style={styles.notation}>
          3.4
        </Text>

        </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10, marginBottom:20}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookTitle:"All Grown Up",bookIsbn:12345678900,author:"Vi Keeland",lien:"https://image.epub.pub/all-grown-up-by-vi-keeland-1.jpg",price:"4.99$-24.99$",publication:"Published on July 8th 2019"})}> //recuperation des donnes du livre afin de les utiliser dans les autres pages
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://image.epub.pub/all-grown-up-by-vi-keeland-1.jpg"}}>
            </Image> //lien url de l'image
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> All Grown Up </Text> 
          <Text style={styles.otherText}> Vi Keeland </Text> 
         <Text style={styles.priceText}> 4.99$-24.99$ </Text>
         <Text style={styles.otherText}> Published on July 8th 2019 </Text>
          <Text style={styles.notation}>
          2.3
        </Text>

        </View>
      </View>
    </View>
    <View>

    </View>

      </View>
      </ScrollView>
    );
    }
  }

/** Classe contenant les livre pour la categorie Health and Well Being. Les livres de cette categorie contiendront les memes informations que les livres des autres categories c'est a dire: le titre du livre, le nom de l'auteur, la date de publication, la marge de prix, la noatation */
  class HealthBookClass extends Component {//Estelle Class
  //Tu dois transmettre le titre l'isbn et l image de tes livres a Salwath comme je l ai fait
  constructor(props) {
    super(props);
     const categoryName=this.props.navigation.state.params.categorieName;
     this.state = {
      categoryName:categoryName,
    }
  }

  static navigationOptions = ({ navigation}) => {
    return { 
      // recuperation des donnees passees en parametres afin d'avoir un titre personnalise
      title: navigation.getParam('categorieName'),
      headerStyle: {
          backgroundColor: "#1E90FF",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: (
         <TouchableOpacity onPress={()=>navigation.navigate('HelpPage')}><Text style={{fontWeight: 'bold',fontSize: 20,marginRight:10,color:'#fff',textDecorationLine:"underline"}}>Help</Text>
         </TouchableOpacity> //lien vers la page Help
         
      
    ),
    };  
        
      };
    
  render() {
    return (
      <ScrollView    style={{flex:4 ,flexDirection:"column",justifyContent: 'space-between', }}>
      <View>

      <View style={{marginRight:50,}}>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Keto for Women",author:"Leanne Vogel",lien:"https://images-na.ssl-images-amazon.com/images/I/51qsoBkkLbL._SX409_BO1,204,203,200_.jpg",price:"13.99$-43.99$",publication:"Published on June 18th 2019"})}> //recuperation des donnes pour les utiliser dans d'autres pages
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://images-na.ssl-images-amazon.com/images/I/51qsoBkkLbL._SX409_BO1,204,203,200_.jpg"}}>
            </Image> //lien url de l'image
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> Keto for Women </Text> 
         <Text style={styles.otherText}> Leanne Vogel </Text>         
        <Text style={styles.priceText}> 13.99$-43.99$ </Text> 
         <Text style={styles.otherText}> Published on June 18th 2019 </Text>
          <Text style={styles.notation}>
          4.7
        </Text>

        </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"The self-care prescription",author:"Robyn Gobin",lien:"https://images-na.ssl-images-amazon.com/images/I/51u83VmQ9PL.jpg",price:"8.99$-20.99$",publication:"Published on June 25th 2019"})}> //recuperation des donnes pour les utiliser dans d'autres pages
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://images-na.ssl-images-amazon.com/images/I/51u83VmQ9PL.jpg"}}>
            </Image> //lien url vers l'image
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> The self-care prescription </Text> 
         <Text style={styles.otherText}> Robyn Gobin </Text> 
         <Text style={styles.priceText}> 8.99$-20.99$ </Text> 
         <Text style={styles.otherText}> Published on June 25th 2019 </Text>
          <Text style={styles.notation}>
          4.5
        </Text>

        </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Chillpreneur",author:"Denise Duffield Thomas",lien:"https://images-na.ssl-images-amazon.com/images/I/4174X7DlVAL.jpg",price:"17.99$-40$",publication:"Published on November 13th 2018"})}> //recuperatio des donnes du livre afin de les utiliser dans d'autres pages
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://images-na.ssl-images-amazon.com/images/I/4174X7DlVAL.jpg"}}>
            </Image> //lien url de l'image
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> Chillpreneur </Text> 
         <Text style={styles.otherText}> Denise Duffield Thomas </Text> 
         <Text style={styles.priceText}> 17.99$-40$ </Text>
         <Text style={styles.otherText}> Published on November 13th 2018 </Text>
          <Text style={styles.notation}>
          3.8
        </Text>

        </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10, marginBottom:20}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Flash Count Diary",author:"Darcey Steinke",lien:"https://images-na.ssl-images-amazon.com/images/I/61OTY2-4anL.jpg",price:"14.99$-30.99$",publication:"Published on June 18th 2019"})}> //recuperation des donnees du livre afin de les utiliser dans les autres pages
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://images-na.ssl-images-amazon.com/images/I/61OTY2-4anL.jpg"}}>
            </Image> //lien url de l'image
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> Flash Count Diary </Text> 
         <Text style={styles.otherText}> Darcey Steinke </Text> 
         <Text style={styles.priceText}> 14.99$-30.99$ </Text> 
         <Text style={styles.otherText}> Published on June 18th 2019 </Text>
          <Text style={styles.notation}>
          2.7
        </Text>

        </View>
      </View>
    </View>
    <View>

    </View>

      </View>
      </ScrollView>
    );
    }
  }

/** Classe representant les livres qui ne sont dans aucune des categories ci-dessus comme les livres d'enquetes ou de thriller. Tout comme les autres livres, ceux ci contiendront le titre du livre, le nom de l'auteur, la marge de prix, la date de publication ainsi que la notation */
  class OtherBookClass extends Component {//Estelle Class
  //Tu dois transmettre le titre l'isbn et l image de tes livres a Salwath comme je l ai fait
  constructor(props) {
    super(props);
     const categoryName=this.props.navigation.state.params.categorieName;
     this.state = {
      categoryName:categoryName,
    }
  }

  static navigationOptions = ({ navigation}) => {
    return { 
      //recuperation du parametre afin d'assigner un titre a la page
      title: navigation.getParam('categorieName'),
      headerStyle: {
          backgroundColor: "#1E90FF",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: (
         <TouchableOpacity onPress={()=>navigation.navigate('HelpPage')}><Text style={{fontWeight: 'bold',fontSize: 20,marginRight:10,color:'#fff',textDecorationLine:"underline"}}>Help</Text>
         </TouchableOpacity> //lien vers la page Help
         
      
    ),
    };  
        
      };
    
  render() {
    return (
      <ScrollView    style={{flex:4 ,flexDirection:"column",justifyContent: 'space-between', }}>
      <View>

      <View style={{marginRight:50,}}>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Mile 81",author:"Stephen King",lien:"https://www.babelio.com/couv/bm_CVT_Mile-81_3138.jpg",price:"3.99$-20$",publication:"Published on September 1st 2011"})}> //recuperation des inormations du livre
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://www.babelio.com/couv/bm_CVT_Mile-81_3138.jpg"}}>
            </Image> //lien url correspondant a l'image du livre
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> Mile 81 </Text> //titre de l'oeuvre
         <Text style={styles.otherText}> Stephen King </Text> //nom de l'auteur
         <Text style={styles.priceText}> 3.99$-20$ </Text> //marge de prix du livre
         <Text style={styles.otherText}> Published on September 1st 2011 </Text> //date de publication
          <Text style={styles.notation}>
          4.9
        </Text> //notation du livre

        </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Gone Girl",author:"Gillian Flynn",lien:"https://upload.wikimedia.org/wikipedia/en/0/05/Gone_Girl_Poster.jpg",price:"9.99$-20$",publication:"Published on June 5th 2012"})}> //recuperation des informations concernant le livre
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://upload.wikimedia.org/wikipedia/en/0/05/Gone_Girl_Poster.jpg"}}> 
            </Image> //lien contenant l'image du livre
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> Gone Girl </Text> //titre du livre
         <Text style={styles.otherText}> Gillian Flynn </Text> //nom de l'auteur
         <Text style={styles.priceText}> 9.99$-20$ </Text> //marge de prix du livre
         <Text style={styles.otherText}> Published on June 5th 2012 </Text> //date de publication du livre
          <Text style={styles.notation}>
          4.7
        </Text> //notation du livre

        </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookIsbn:12345678900,bookTitle:"Hungry",author:"Crystal Renn",lien:"https://images-na.ssl-images-amazon.com/images/I/51tB1uYLMZL._SX321_BO1,204,203,200_.jpg",price:"16.99$-40$",publication:"Published on September 8th 2009"})}> //parametres enregistres afin de permettre aux autres pages de recuperer les informations
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://images-na.ssl-images-amazon.com/images/I/51tB1uYLMZL._SX321_BO1,204,203,200_.jpg"}}>
            </Image> //lien url contenant l'image coreespondant au livre
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> Hungry </Text> //titre du livre
         <Text style={styles.otherText}> Crystal Renn </Text> //nom de l'auteur
         <Text style={styles.priceText}> 16.99$-40$ </Text> //marge de prix du livre
         <Text style={styles.otherText}> Published on September 8th 2009 </Text> //date de publication du livre
          <Text style={styles.notation}>
          3.7
        </Text> //notation du livre
        </View>
      </View>
    </View>

    <View>
        <View style={{flexDirection:"row", marginLeft:5, marginTop:10, marginBottom:20}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookToReadPage",{bookTitle:"The Ice Cream Book",author:"Louis P. De Gouy",lien:"https://images-na.ssl-images-amazon.com/images/I/51tNJRSI-3L._SX331_BO1,204,203,200_.jpg",price:"19.99$-30$",publication:"Published on May 15th 2019",bookIsbn:12345678900})}> //parametres utilises afin de sauvegarder ou d'mporter les informations du livre vers les autres pages qui en auront besoin
        //lien contenant l'image du livre
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri:"https://images-na.ssl-images-amazon.com/images/I/51tNJRSI-3L._SX331_BO1,204,203,200_.jpg"}}>
            </Image>
          </TouchableOpacity>

        <View id="livre1">
          <Text style={styles.titleText}> The Ice Cream Book </Text> //Titre du livre
          <Text style={styles.otherText}> Louis P. De Gouy </Text> //Auteur du livre
          <Text style={styles.priceText}> 19.99$-30$ </Text> //marge du prix du livre 
          <Text style={styles.otherText}> Published on May 15th 2019 </Text> //date de publication du livre
         //noattion ou feedback du livre en fonction des commentaires des utilisateurs
          <Text style={styles.notation}>
          1.7
        </Text>
        </View>
      </View>
    </View>
    <View>

    </View>

      </View>
      </ScrollView>
    );
    }
  }

  //Page qui presente chaque livre  avec les prix et les site et lesdifferentes informations
  class BookToReadPageClass extends Component {
  
  //Constructor
  constructor(props) {
    super(props);
    
     const bookTitle=this.props.navigation.state.params.bookTitle;
     const lien = this.props.navigation.state.params.lien;
     const author=this.props.navigation.state.params.author;
      const publication=this.props.navigation.state.params.publication;
      const price=this.props.navigation.state.params.price;
       const bookIsbn=this.props.navigation.state.params.bookIsbn;
      
     this.state = {
      bookTitle:bookTitle,//titre du livre
      author:author,//auteur
      publication:publication,//date de publication
      price:price,//range de prix du livre
      lien:lien,//lien de l'image du livre
      bookIsbn:bookIsbn,//isbn du livre
    }
  }

  //Header
  static navigationOptions = ({ navigation}) => {
    return { 
      title: navigation.getParam('bookTitle'),
      headerStyle: {
          backgroundColor: "#1E90FF",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: (
         <TouchableOpacity onPress={()=>navigation.navigate('HelpPage')}><Text style={{fontWeight: 'bold',fontSize: 20,marginRight:10,color:'#fff',textDecorationLine:"underline"}}>Help</Text>
         </TouchableOpacity>
         
      
    ),
    };  
        
      };
    
  render() {
    return (
      <ScrollView    style={{flex:4 ,flexDirection:"column",justifyContent: 'space-between', }}>
      {/* Presentation du livre
            */}

        <View style={{flexDirection:"row", marginLeft:5, marginTop:10, marginRight:10}}>
            {/* Image du livre
            */}
            <Image style={{width:200, height:200, marginLeft:3}} source={{uri: this.state.lien }}>
            </Image>
            <View id="livre1" style={{marginLeft:5, marginRight:5, width:150}}>
            {/* Titre du livre
            */}
          <Text style={{fontWeight:"bold",fontSize:18,color:"#483D8B"}} > {this.state.bookTitle}</Text>
          {/*Isbn du livre
            */}
          <Text> #{this.state.bookIsbn} {'\n'}</Text>
          {/* Author du livre
            */}
           <Text>by {this.state.author} {'\n'}</Text> 
           {/*Price range du livre
            */}
           <Text style={{color:"#A52A2A",fontWeight:"bold"}}>{this.state.price} {'\n'} </Text>
           {/* Date de publication  du livre
            */}
           <Text>{this.state.publication} {'\n'} </Text>
          <Text style={{height: 20,width:30, borderColor: "#A52A2A", borderWidth: 20,marginLeft:90,fontWeight:"bold",color:"white",}}>
          4.7
        </Text>

        </View>

        

      </View>

     {/* Presentation des differents vendeurs et leur prix obtenus pour le livre
            */}
      <View id="CompareSection">
      <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:40,}}>
      {/* Boook Seller Amazon
            */}
       <Text Text style={{
fontSize: 18,
    fontWeight: 'bold',marginRight:12

  }}> Amazon </Text>
  {/* Prix sur amazone
            */}
       <Text style={{color:"#A52A2A",fontWeight:"bold"}}> 4.99$ </Text>
       {/* Button Buy now pour aller sur la page amazon du livre
            */}
      <TouchableOpacity style={styles.container}>
          <Button 
                title="Buy now "
                color="#1E90FF" 
                onPress={ ()=>{ Linking.openURL('https://www.amazon.ca/RH-Disney/dp/0736423621/ref=sr_1_1?__mk_fr_CA=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=cinderella+book&qid=1563243310&s=gateway&sr=8-1')}}
                
          />
      </TouchableOpacity>

       </View>


      <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:40,}}>
       <Text style={{
fontSize: 18,
    fontWeight: 'bold',marginRight:42

  }}> Ebay </Text>
       <Text  style={{color:"#A52A2A",fontWeight:"bold",}}> 6.99$ </Text>
        <TouchableOpacity style={styles.container}>
          <Button 
                title="Buy now "
                color="#1E90FF" 
                onPress={ ()=>{ Linking.openURL('https://www.ebay.com/itm/CINDERELLA-Vintage-Childrens-Lady-Bird-Series-Favorite-Fairy-Tale-Book/272839948304?_trkparms=ispr%3D1&hash=item3f86873810:g:tDIAAOSwRplZs2QD&enc=AQADAAAB4KX%2FKt4E1xf3SDqEdBclaYayxqA%2BGfKyTKEfSuXt0nsihRlNyPBIF3IbqZixwugJGWB4o8VRBv%2Fpw%2FVt5dL7vSXLdqBSskdBN8dOVswxeQcAcYYzNcxWeClT3PdD2gHK2DXFuk6sD22jWmKd%2BAna8xn1LvYrAinPasXaplaT6xc7v8oZqc5jICUnIpVYoeennngBpAFDzO7TeJ%2BGqKf6tkwPuy7QVWUghz7aUwc06n3ZmFv81nm8e2o3g2ZN3ewwsnJybk%2FzsoRGtBN%2BTXq6aLBUl%2B2lxt%2FUe3AYR8cjN%2F7t%2BK7UDl%2Fu1utORFk5lOBAcwYxkmvabhOTQyDoJF4DM40uyGibAiKUpVSf%2B3At6j7QZDeVznX46pjqIXg%2FVPABeVNa9kUAmy4Mrmh6rYt349jBFb8j%2F03NBnHGPhawA%2BomS041dgNkeJZ9zDtQ0tXQ0yhqvCRCJDrwX9HENgk50I1iuUun5rqyPQPRYxvpf454omY6gvDj0SQ2GtmPhFECkm3QkHcGVfy%2F0WGnm6u%2FGg1MibnydPl3Mtu%2FnrB6bv3ENmUu4wFQR0ajW0v4xrmv%2BFD647eLumHld75mHxi6SYazpZ9V%2FhQ14oFalwfxSO73Dr77shMft28EFTO5YFARBg%3D%3D&checksum=2728399483041f130ebb0d554f5cb8afe61e54b56aca')}}
                
          />
      </TouchableOpacity>

       </View>

       <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:40,}}>
       <Text style={{
fontSize: 18,
    fontWeight: 'bold',marginRight:38,

  }}> Indigo </Text>
       <Text style={{color:"#A52A2A",fontWeight:"bold"}}> 9.99$ </Text>
       <TouchableOpacity style={styles.container}>
          <Button 
                title="Buy now "
                color="#1E90FF" 
                onPress={ ()=>{ Linking.openURL('https://www.chapters.indigo.ca/fr-ca/livres/recherche/?keywords=cinderella')}}
                
          />
      </TouchableOpacity>

       </View>
       
       </View>


       <View style={{marginTop:15, marginLeft:20, marginRight:20, marginBottom:20}}>

       {/* Description du livre
            */}
     
       <Text style={{
fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'center',
  
    

  }}>Description</Text>
      <Text > 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est. Aenean vel elit scelerisque mauris pellentesque pulvinar. Augue eget arcu dictum varius duis. Imperdiet massa tincidunt nunc pulvinar sapien et. Magna fringilla urna porttitor rhoncus dolor purus non enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Diam vel quam elementum pulvinar etiam non. Mi in nulla posuere sollicitudin aliquam ultrices. Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Posuere urna nec tincidunt praesent. In mollis nunc sed id semper. Diam donec adipiscing tristique risus nec. Vulputate sapien nec sagittis aliquam malesuada. Aliquam etiam erat velit scelerisque in dictum non. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. </Text>

  </View>
  


      </ScrollView>
    );
    }
  }

/*Page aide pour l'utilisateur qui a besoin d'aide
Presente une liste de questions que l'utilisateur pourra se poser et une reponse a ses questions
*/
  class HelpPageClass extends Component {
  //Constructeur
  constructor(props) {
    super(props); 
     
     this.state = {
      
    }
  }
    //Header
  static navigationOptions = {
        title:"Help",
        headerStyle: {
          backgroundColor: "#1E90FF",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        
      };
    
  render() {
    return (
      <View>

      {/* Question1
            */}
      <Text  style={{marginTop:10,fontWeight:"bold",fontSize:20,color:"#483D8B",marginLeft:10,}}  > I did not get any result. What should I do next? </Text>
      {/* Reponse1
            */}
      <Text style={{marginLeft:5,fontSize:14}}> Try more general keywords. </Text>
<Text style={{marginLeft:10}}> Still not able to get a result? We do not provide your product at this moment.    </Text>
      {/* Question2
            */}
      <Text style={{marginTop:10,fontWeight:"bold",fontSize:20,color:"#483D8B",marginLeft:10}}> How do I order the books from Book-Cheap?</Text>
      {/*Reponse2
            */}
      <Text style={{marginLeft:14,fontSize:14}}> Unfortunately, Book-Cheap does not sell product. Click on the button <Text  style={{color:"#A52A2A",fontWeight:"bold",fontSize:18}}> "Buy Now" </Text> to get access to the bookseller website</Text>
      
{/* Question3
            */}
<Text style={{marginTop:10,fontWeight:"bold",fontSize:20,color:"#483D8B",marginLeft:10}}> I had a problem buying a book from a bookseller. What do I do?</Text>
{/* Reponse3
            */}
      <Text style={{marginLeft:14,fontSize:14}}> Unfortunately, we are not responsible for this process. Contact the bookseller directly.</Text>

    

      </View>
    );
    }
  }

//StackNavigator contenant toutes les pages de l'application
const RootStack = createStackNavigator(
  {
    Home:WelcomeClass ,//Page d'accueil
    NotFoundPage:UnfoundPageClass,//Page montrant qu'une recherche n'a aboutit a aucun resultat et procure des suggestions
    ChildrenBook:ChildrenBookClass,//Page de Children Books
    BusinessBook:BusinessBookClass,//Page de la collection Business
    FictionBook:FictionBookClass,//Page de la collection Fiction
    RomanceBook:RomanceBookClass,//Page de la collection Romance
    HealthBook:HealthBookClass,//Page de la collection Health
    OtherBook:OtherBookClass,//Page montrant autres types de collections non citees
    BookToReadPage:BookToReadPageClass,//Page presentant la description du livre,les prix et l'option d'acheter
    HelpPage:HelpPageClass,//Page fournissant de l'aide
   
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
