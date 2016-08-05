var NewsBox = React.createClass({
    render: function() {
        return (
            <NewsList data={this.props.data}/>
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
            <div>
                <h1>Latest news</h1>
                {news}
            </div>
        );
    }
});

var NewsItem = React.createClass({
    render: function() {
        return (
            <div>
                <div>
                    <a href={this.props.url}>{this.props.title}</a>
                </div>
                <img src={this.props.urlToImage} height="80" width="120"/>
                <hr/>
            </div>
        );
    }
});

var News = [
    {
        author: "Natasha Lomas",
        description: "Walking around the neighborhood handing out CVs in the hopes of scoring shifts in a local cafe or restaurant has never been an efficient job search process...",
        title: "inploi is another jobs app that wants to kill off the service industry CV",
        url: "http://social.techcrunch.com/2016/08/04/inploi-is-another-jobs-app-that-wants-to-kill-off-the-service-industry-cv/",
        urlToImage: "https://tctechcrunch2011.files.wordpress.com/2016/08/p1040673.jpg?w=764&amp;h=400&amp;crop=1",
        publishedAt: "2016-08-04T10:36:23Z"
    },
    {
        author: "Brian Heater",
        description: "The official promo for Strava’s new beacon feature shows a runner attempting to outpace a giant boulder – something I suspect isn’t too common an..",
        title: "Strava adds a real-time safety feature to its fitness tracking app",
        url: "http://social.techcrunch.com/2016/08/04/strava-beacon/",
        urlToImage: "https://tctechcrunch2011.files.wordpress.com/2016/08/unnamed.png?w=764&amp;h=400&amp;crop=1",
        publishedAt: "2016-08-04T09:00:46Z"
    },
    {
        author: "Jon Russell",
        description: "Go-Jek, the motorbike taxi on-demand service that rivals Uber and Grab in Indonesia, has closed $550 million in new funding, a source close to the company..",
        title: "Indonesia’s Go-Jek raises $550 million to battle Uber and Grab",
        url: "http://social.techcrunch.com/2016/08/04/indonesias-go-jek-raises-550-million-to-battle-uber-and-grab/",
        urlToImage: "https://tctechcrunch2011.files.wordpress.com/2016/06/gettyimages-517174332.jpg?w=764&amp;h=400&amp;crop=1",
        publishedAt: "2016-08-04T08:58:45Z"
    }
];

ReactDOM.render(
    <NewsBox data={News}/>,
    document.getElementById('content')
);