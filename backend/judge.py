# Add to backend
import subprocess
import tempfile

def execute_python_code(code: str) -> dict:
    with tempfile.NamedTemporaryFile(suffix=".py", delete=True) as f:
        f.write(code.encode())
        f.flush()
        try:
            result = subprocess.run(
                ["python", f.name],
                capture_output=True,
                text=True,
                timeout=5
            )
            return {
                "success": result.returncode == 0,
                "output": result.stdout,
                "error": result.stderr
            }
        except subprocess.TimeoutExpired:
            return {"success": False, "error": "Execution timed out"}