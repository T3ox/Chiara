import os

class DuplicateHandler:
    @staticmethod
    def get_safe_filename(target_dir: str, new_name: str, extension: str) -> str:
        """
        Ensures the filename is unique in the target directory by appending _1, _2, etc.
        """
        safe_name = new_name
        counter = 1
        
        while True:
            candidate_path = os.path.join(target_dir, f"{safe_name}{extension}")
            if not os.path.exists(candidate_path):
                return safe_name
                
            safe_name = f"{new_name}_{counter}"
            counter += 1
