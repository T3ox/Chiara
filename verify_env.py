try:
    import dotenv
    print("SUCCESS: dotenv imported successfully")
except ImportError as e:
    print(f"FAILURE: {e}")
except Exception as e:
    print(f"ERROR: {e}")
