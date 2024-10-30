$(document).ready(function () {
    let html =''
    const imgs = document.querySelectorAll('.item-container2 img')

    $.ajax({
        type: "GET",
        url: 'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1',
        headers: {
            accept: 'application/json',    
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTQxZjA0OGZiYzZlM2JlZjUwMDU1MTc1OWM3ZTZiMSIsIm5iZiI6MTczMDA5MDMxOS45OTI1NzgsInN1YiI6IjY3MWYwYmJlOWZmNjgxZDllMGE0OGI1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g16SiXEFQRMZUD4MpgOUMsgC_Rk0hfrs1IA9p2xI1ZE',
        },
        success: function (response) {
            const data = response.results

            $('.img-container1').attr('src', 'https://image.tmdb.org/t/p/original'+data[15].poster_path);
            $('.img-container2').attr('src', 'https://image.tmdb.org/t/p/original'+data[2].poster_path);
            $('.img-container3').attr('src', 'https://image.tmdb.org/t/p/original'+data[3].poster_path);
            $('.img-container4').attr('src', 'https://image.tmdb.org/t/p/original'+data[0].poster_path);
            $('.img-container5').attr('src', 'https://image.tmdb.org/t/p/original'+data[11].poster_path);

            for(let i = 0; i<data.length; i++){
                html += '<div class="item-container2">'
                html += '<img src="https://image.tmdb.org/t/p/original'+data[i].poster_path+'" alt="Filme Poster">'
                html += '<div class="description">'
                html += '<h3>'+data[i].title.toUpperCase()+'</h3>'
                html += '<p>'+data[i].overview+'</p>'
                html += '</div>'
                html += '</div>'
            }

            $('.content-container2').html(html);
            
        }
    });

    $('#search-input').blur(function (e) { 
        e.preventDefault();
    
        const search = $(this).val();
        if (!search == '') {
            
            searchReal = search.replaceAll(' ', '%20')
            
            
            $.ajax({
                type: "GET",
                url: "https://api.themoviedb.org/3/search/movie?query="+searchReal+"&include_adult=true&language=pt-BR&page=1",
                headers: {
                    accept: 'application/json',    
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTQxZjA0OGZiYzZlM2JlZjUwMDU1MTc1OWM3ZTZiMSIsIm5iZiI6MTczMDA5MDMxOS45OTI1NzgsInN1YiI6IjY3MWYwYmJlOWZmNjgxZDllMGE0OGI1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g16SiXEFQRMZUD4MpgOUMsgC_Rk0hfrs1IA9p2xI1ZE',
                },
                success: function (response) {
                    const data = response.results
                    if(data.length == 0){
                        Swal.fire({
                            icon: "error",
                            title: "Algo deu errado!",
                            text: "Não foi possível encontrar filmes relacionados a "+search
                        });
                    } else {
                        html = ''
                        console.log(data);
                        for(let i = 0; i<data.length; i++){
                            html += '<div class="item-container2">'
                            html += '<img src="https://image.tmdb.org/t/p/original'+data[i].poster_path+'" alt="Filme Poster">'
                            html += '<div class="description">'
                            html += '<h3>'+data[i].title.toUpperCase()+'</h3>'
                            html += '<p>'+data[i].overview+'</p>'
                            html += '</div>'
                            html += '</div>'
                        }
                        
                        $('.content-container2').html(html);
                        $('#titulo-container2').html('Confira os filmes relacionados a: '+search);
                        
                        location.href = '#container2'
                    }
                }
            });
        }
    });
});