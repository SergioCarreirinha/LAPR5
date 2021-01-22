%-------------------------------------HTTP Server-------------------------------------%
:- consult('geneticos2').

:- module(server,
      [ server/1            % ?Port
      ]).

:- use_module(library(http/http_json)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_files)).
:- use_module(library(http/http_unix_daemon)).
:- use_module(library(http/http_log)).
:- use_module(library(http/http_dyn_workers)).
:- http_handler(root(.), http_reply_from_files('.', []), [prefix]).
:- set_setting(http:cors, [*]).

server(Port) :-
    http_server(http_dispatch,
                [ port(Port),
                  workers(16)
                ]).

:- http_handler('/api/genetics',post_data,[]).

server(Port) :-
  http_server(http_dispatch, [
  port(Port),
  workers(16) ]).

post_data(Request):-
  cors_enable,
  format('Access-Control-Allow-Origin: ~w~n', [*]),
  format('Access-Control-Allow-Headers: ~w~n', [*]),
	http_parameters(Request,
    [nGeneration(Ger,[integer]),
    nPopulation(Pop,[integer]),
    pCrossing(Cruz,[integer]),
    pMutation(Mut,[integer]),
    nTarget(Tar,[integer]),
    nStability(Repet,[integer])]),
   gerarRequest(Ger, Pop, Cruz, Mut, Tar, Repet),
   reply_json(null).


%-------------------------------------HTTP Server-------------------------------------%
