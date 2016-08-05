var NewsRow = React.createClass({
    loadNewsFromServer: function(){
      $.ajax({
        url: this.props.url + "articles?source=bbcnews&sortBy=popular" + this.props.apikey,
        dataType: 'json',
        cache:false,
        success: function(result){
          this.setState({data:result.articles.slice(0, 9)});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    getSources: function(){
      $.ajax({
        url: this.props.url + "sources",
        dataType: 'json',
        cache:false,
        success: function(result){
          var ids = result.sources.map(function(item, index) {
            return item.id;
          });
          this.setState({sources:ids});
          this.concatData();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    getNewsForSource: function(sourceIndex) {
      $.ajax({
        url: this.props.url + "articles?source=" + this.state.sources[sourceIndex] + "&sortBy=latest" + this.props.apikey,
        dataType: 'json',
        cache:false,
        success: function(result){
          var currentArticles = this.state.articles;
          if(result.articles.length >= 5) {
            var newArticles = result.articles.slice(0, 5);
            for(var i = 0; i < 5; i++) {
              currentArticles.push(newArticles[i]);
            }
          }
          this.setState({articles:currentArticles});
        },
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    concatData: function(){
      var allArticles = new Array();
      if(this.state.sources.length > 0) {
        this.getNewsForSource(0);
      }
      /*
      var temp;
      var randomIndex;
      for(var i = 0; i < allArticles.length; i++) {
        randomIndex = getRandomIndexNotThis(allArticles.length, i);
        temp = allArticles[randomIndex];
        allArticles[randomIndex] = allArticles[i];
        allArticles[i] = temp;
      }*/
      //this.setState({data:allArticles});
    },
    getInitialState: function(){
      return {
        data:[],
        sources:[],
        articles:[]
      };
    },
    componentDidMount: function(){
      this.loadNewsFromServer();
      this.getSources();
      setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <NewsGrid data={this.state.data}/>
        );
    }
});
function getRandomIndexNotThis(maxIndex, thisIndex) {
  var attempt = thisIndex;
  while(attempt == thisIndex) {
    attempt = Math.floor(Math.random() * maxIndex);
  }
  return attempt;
};


var NewsGrid = React.createClass({
  render: function() {
    var numRows = Math.floor(this.props.data.length / 3) + 1;
    var rows = new Array();
    for(var i = 0; i < numRows; i++) {
      rows.push(this.props.data.slice(i * 3, i * 3 + 3));
    }
    var newsRows = rows.map(function(item, index) {
      return (
        <NewsList data={item}/>
      );
    });
    return (
      <div className="container">
        <h1>Guess the news</h1>
        <h2>Most popular news from BBC, in images. <strong>Can you guess the titles?</strong></h2>
        {newsRows}
        
      </div>
    );
  }
});


var NewsList = React.createClass({
    render: function() {
        var news = this.props.data.map(function (item, index) {
            return (
                <NewsItem
                    key={index}
                    author={item.author}
                    description={item.description}
                    title={item.title}
                    url={item.url}
                    urlToImage={item.urlToImage}
                    publishedAt={item.publishedAt}
                />
            );
        });
        return (
              <div className="row">
                {news}
              </div>
        );
    }
});

var NewsItem = React.createClass({
    render: function() {
        return (
      <div className="col-sm-4">
        <div className="flip-container">
        <div className="flipper">
          <div className="front">
            <img src={this.props.urlToImage} height="100%" max-height="80px" width="100%"/>
          </div>
          <div className="back">
            <a className="title" href={this.props.url} target="_blank">{this.props.title}</a>
          </div>
          </div>
        </div>
      </div>       
          
        );
    }
});

ReactDOM.render(
    <NewsRow url="https://newsapi.org/v1/" apikey="&apiKey=3a20cd150f394bcf96974d88b7bf1eb3" pollInterval={60000}/>,
    document.getElementById('content')
);