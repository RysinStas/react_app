const getResourse = async (url) => {
    const res = await fetch(url
        );
    const body = await res.json();
    return  body;
};
const url = 'http://dev.com/api/';
// const url = 'https://swapi.co/api/people/1/';
getResourse(url ).then((body) => {
    console.log(body);
}).catch((err)=>{
    console.error(err);
});