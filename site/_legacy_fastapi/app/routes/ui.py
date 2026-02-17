from __future__ import annotations

from datetime import datetime
from pathlib import Path

from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from app.config import load_site_config


router = APIRouter()
templates = Jinja2Templates(directory=str(Path(__file__).resolve().parents[1] / "templates"))


def _site_context(request: Request, page_title: str, meta_description: str, active_nav: str) -> dict:
    return {
        "request": request,
        "page_title": page_title,
        "meta_description": meta_description,
        "active_nav": active_nav,
        "year": datetime.now().year,
        "site": load_site_config(),
    }


@router.get("/", response_class=HTMLResponse)
def home(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        "home.html",
        _site_context(
            request,
            "FolderOrganizer | Organizzazione documentale operativa",
            "FolderOrganizer aiuta team e aziende a trasformare flussi documentali in processi chiari, misurabili e replicabili.",
            "home",
        ),
    )


@router.get("/prezzi", response_class=HTMLResponse)
def pricing(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        "pricing.html",
        _site_context(
            request,
            "FolderOrganizer | Prezzi",
            "Prezzi su richiesta per una piattaforma documentale progettata su processi reali.",
            "prezzi",
        ),
    )


@router.get("/privacy", response_class=HTMLResponse)
def privacy(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        "privacy.html",
        _site_context(
            request,
            "FolderOrganizer | Privacy",
            "Informazioni privacy per l'uso della piattaforma FolderOrganizer.",
            "privacy",
        ),
    )


@router.get("/termini", response_class=HTMLResponse)
def terms(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        "terms.html",
        _site_context(
            request,
            "FolderOrganizer | Termini",
            "Termini di servizio placeholder per la fase iniziale del progetto.",
            "termini",
        ),
    )


@router.get("/accedi", response_class=HTMLResponse)
def login(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        "login.html",
        _site_context(
            request,
            "FolderOrganizer | Accedi",
            "Area accesso in preparazione per le prossime iterazioni.",
            "accedi",
        ),
    )


@router.get("/account/{path:path}", response_class=HTMLResponse)
def account_alias(request: Request, path: str) -> HTMLResponse:
    context = _site_context(
        request,
        "FolderOrganizer | Account",
        "Area account in preparazione.",
        "accedi",
    )
    context["account_path"] = path
    return templates.TemplateResponse("login.html", context)

