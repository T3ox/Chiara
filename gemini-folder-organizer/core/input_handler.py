import os
from typing import Tuple, List

class InputHandler:
    @staticmethod
    def request_directories() -> Tuple[str, str]:
        print("\n--- Gemini Folder Organizer ---")
        input_dir = input("Enter input folder path: ").strip()
        result_dir = input("Enter result folder path: ").strip()

        if not os.path.isdir(input_dir):
            raise ValueError(f"Input directory does not exist: {input_dir}")
        if not os.path.isdir(result_dir):
            raise ValueError(f"Result directory does not exist: {result_dir}")
            
        return input_dir, result_dir

    @staticmethod
    def get_available_folders(result_dir: str) -> List[str]:
        # Ensure DaRevisionare exists
        os.makedirs(os.path.join(result_dir, "DaRevisionare"), exist_ok=True)
        return [f for f in os.listdir(result_dir) if os.path.isdir(os.path.join(result_dir, f))]
