import tensorflow as tf
import tensorflow_hub as hub
import os
from dotenv import load_dotenv

load_dotenv()

# Dynamic Keras import
version_fn = getattr(tf.keras, "version", None)
if version_fn and version_fn().startswith("3."):
    import tf_keras as keras
else:
    keras = tf.keras

# base dir
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model_path = os.path.join(base_dir, os.getenv('MODEL_PATH'))

model = keras.models.load_model(
    model_path,
    custom_objects={'KerasLayer': hub.KerasLayer}
)
print("model loaded")

converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
tflite_model = converter.convert()

# saving tf lite model
tflite_path = os.path.join(base_dir, os.getenv('TFLITE_MODEL_PATH'))
with open(tflite_path, 'wb') as f:
    f.write(tflite_model)

print(f"tflite model saved to: {tflite_path}")

tflite_size = os.path.getsize(tflite_path) / (1024 * 1024)
print(f"  tflite model size: {tflite_size:.2f} mb")