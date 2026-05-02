import argparse
import sys

from services.undo_manager import UndoManager


def main() -> None:
    parser = argparse.ArgumentParser(description="Annulla l'ultima sessione completata dell'organizer.")
    parser.add_argument(
        "--history",
        default=".organizer_history.json",
        help="Percorso del file .organizer_history.json. Default: directory corrente.",
    )
    args = parser.parse_args()

    undo_manager = UndoManager(args.history)
    result = undo_manager.undo_last_session()

    if not result["success"]:
        print(f"Undo completato parzialmente o non eseguito: {result.get('reason', '')}")
        for error in result.get("errors", []):
            print(f"- {error}")
    else:
        print(f"Undo completato. File ripristinati: {result['restored']}")

    sys.exit(0 if result["success"] else 1)


if __name__ == "__main__":
    main()
